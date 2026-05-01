import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore, 
  enableIndexedDbPersistence 
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Singleton initialization
let app;
let db;
let auth;
let appCheck;

export const initFirebase = () => {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    
    // Initialize App Check Zero-Trust
    if (typeof window !== 'undefined' && import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
      // In development mode, you would set self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
      });
    }

    // Initialize Firestore with long-polling optimization
    db = initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true
    });

    // Initialize Auth
    auth = getAuth(app);
    signInAnonymously(auth).catch((error) => {
      console.error('Firebase Anonymous Auth Error:', error.code, error.message);
    });

    // Enable offline persistence
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support all of the features required to enable persistence');
      }
    });

  } else {
    app = getApps()[0];
    db = getFirestore(app);
  }
  
  return { app, db, appCheck };
};

// Export db getter for services
export const getDb = () => {
  if (!db) {
    const initialized = initFirebase();
    return initialized.db;
  }
  return db;
};

export const getFirebaseToken = async () => {
  if (!auth) return null;
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
};
