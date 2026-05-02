import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';
import { GoogleGenAI } from '@google/genai';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

// ES Module path support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '../.env') });
}

const app = express();
const port = process.env.PORT || 8080;

// Security & Performance Middlewares
app.use(helmet({
  contentSecurityPolicy: false, // We handle CSP manually below for flexibility
}));
app.use(compression());
app.use(cors());
app.use(express.json());

// Initialize AI Response Cache (1 hour TTL)
const aiCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Rate Limiting for Chat API
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    intent: 'ERROR',
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// Set Production CSP Headers with strict whitelisting
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://www.google-analytics.com https://www.google.com/recaptcha/ https://generativelanguage.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "frame-src https://www.google.com/recaptcha/;"
  );
  next();
});

// GET /api/health: Professional health check for Cloud Run monitoring
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    version: '1.0.4'
  });
});

// Serve static files from the Vite build directory
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Lazy client variables
let ai = null;
let recaptchaClient = null;

/**
 * Create an assessment to analyze the risk of a UI action.
 * @param {string} token The token obtained from the client.
 * @param {string} recaptchaAction Action name corresponding to the token.
 * @returns {Promise<number|null>} Risk score or null if invalid.
 */
async function createAssessment(token, recaptchaAction) {
  if (!recaptchaClient) {
    recaptchaClient = new RecaptchaEnterpriseServiceClient();
  }

  const projectID = process.env.VITE_FIREBASE_PROJECT_ID || "virtual-promptwars-ep2";
  const recaptchaKey = process.env.VITE_RECAPTCHA_SITE_KEY || "6Le01M4sAAAAAIoL-WINAR75BfYP2UJqYKeB9G66";

  const projectPath = recaptchaClient.projectPath(projectID);

  const request = {
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey,
      },
    },
    parent: projectPath,
  };

  const [response] = await recaptchaClient.createAssessment(request);

  if (!response.tokenProperties.valid) {
    console.error(`reCAPTCHA Token Invalid: ${response.tokenProperties.invalidReason}`);
    return null;
  }

  if (response.tokenProperties.action !== recaptchaAction) {
    console.error(`reCAPTCHA Action Mismatch: Expected ${recaptchaAction}, got ${response.tokenProperties.action}`);
    return null;
  }

  return response.riskAnalysis.score;
}

const SYSTEM_INSTRUCTION = `
You are the intent router for the "Matdaan Saathi" mobile application...
(Same system instruction as frontend, but securely isolated on backend)
...
You MUST respond with a JSON object.
`;

/**
 * AI Chat Endpoint with security and caching
 */
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { prompt, history, recaptchaToken, recaptchaAction } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    /**
     * Cache-Aside Pattern Implementation:
     * 1. Check if the AI response is already in the local memory cache.
     * 2. If present (Cache Hit), return immediately to save API latency and costs.
     * 3. If absent (Cache Miss), proceed to secure AI orchestration and update cache.
     */
    const cacheKey = JSON.stringify({ prompt, history });
    const cachedResponse = aiCache.get(cacheKey);
    if (cachedResponse) {
      console.log('Serving cached AI response [Cache Hit]');
      return res.json(cachedResponse);
    }

    // Verify reCAPTCHA
    if (!recaptchaToken || !recaptchaAction) {
      return res.status(400).json({
        intent: 'ERROR',
        message: 'Security verification failed. Please refresh and try again.'
      });
    }

    const score = await createAssessment(recaptchaToken, recaptchaAction);

    if (score === null || score < 0.5) {
      console.warn(`[SECURITY] High risk request blocked. reCAPTCHA Score: ${score}, Action: ${recaptchaAction}`);
      return res.status(403).json({
        intent: 'ERROR',
        message: 'I cannot process this request right now due to security policies. If you are a human, please try again later.'
      });
    }

    // Initialize Gemini lazily
    if (!ai) {
      ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
    }

    // Convert history to Gemini format if present
    const contents = history && history.length > 0
      ? history.map(m => ({ role: m.type === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }))
      : [];

    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contents,
      config: {
        systemInstruction: `You are the smart assistant for the 'Matdaan Saathi' mobile application. 
        
        Your instructions:
        1. If the user asks a factual question about Indian elections that you know is TRUE (e.g., 'Minimum age to vote?', 'What is EPIC?'), return a short ONE-LINE answer in the 'message' field and set intent to 'FACT_REPLY'.
        2. If the user query is a follow-up or requires context from the history, use the provided conversation history to maintain continuity.
        3. For any other queries where you cannot provide a direct factual answer or guidance, set intent to 'UNKNOWN' and respond EXACTLY with the message: 'I can help with voter services and election guidance.'
        
        You MUST respond with valid JSON containing:
        - intent: FACT_REPLY or UNKNOWN
        - message: The one-line answer or the mandatory fallback string
        - suggestions: Array of 2-3 related topics`,
        responseMimeType: "application/json",
      }
    });

    const resultText = response.text();
    let resultObj;
    try {
      resultObj = JSON.parse(resultText);
    } catch (e) {
      console.error("Failed to parse Gemini output:", resultText);
      throw new Error("Invalid response format from AI");
    }

    // Cache the result before sending
    aiCache.set(cacheKey, resultObj);
    
    res.json(resultObj);

  } catch (error) {
    console.error('AI Processing Error:', {
      message: error.message,
      stack: error.stack,
      code: error.code || 'AI_EXECUTION_FAILURE'
    });
    res.status(500).json({
      intent: 'ERROR',
      message: 'I am having trouble connecting to my knowledge base right now. Please try one of the popular topics.',
      suggestions: ['Register as a voter', 'Check voter list', 'How to vote']
    });
  }
});

// Catch-all route to serve the frontend for any non-API routes (SPA support)




app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    next();
  }
});
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful Termination for Cloud Run
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});

