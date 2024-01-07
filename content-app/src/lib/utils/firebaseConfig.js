import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBG5KVVVu84fw9sARGGdr2K5TQlpM5iKDc",
  authDomain: "content-a.firebaseapp.com",
  projectId: "content-a",
  storageBucket: "content-a.appspot.com",
  messagingSenderId: "751599701522",
  appId: "1:751599701522:web:a5a2d3524e0fbc660852cb",
  measurementId: "G-7SW4890SF9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

let messagingInstance;
let analytics;

// Initialize messaging if supported
export const initFirebaseMessaging = async () => {
  const supported = await isSupported();
  if (supported && typeof window !== 'undefined') {
    messagingInstance = getMessaging(app);
  } else {
    console.warn('Firebase Messaging is not supported in this browser.');
  }
  return messagingInstance;
};

// Initialize analytics if supported and in a browser context
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, app, firestore, analytics, messagingInstance };
