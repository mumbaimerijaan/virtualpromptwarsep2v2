/**
 * Chat related type definitions
 */

export type ChatIntent = 'FACT_REPLY' | 'UNKNOWN' | 'ERROR';

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  intent?: ChatIntent;
  suggestions?: string[];
  timestamp: number;
}

export interface ChatRequest {
  prompt: string;
  history?: ChatMessage[];
  recaptchaToken: string;
  recaptchaAction: string;
}

export interface ChatResponse {
  intent: ChatIntent;
  message: string;
  suggestions?: string[];
}
