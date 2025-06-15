import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyA67BqPJcXb9U8pPlCsKSm7k3CdT1a2peg",
    authDomain: "smart-inventory-b82cf.firebaseapp.com",
    projectId: "smart-inventory-b82cf",
    storageBucket: "smart-inventory-b82cf.firebasestorage.app",
    messagingSenderId: "657915325182",
    appId: "1:657915325182:web:016d477a853f47495093af"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

// Request FCM token
export async function requestFCMToken(): Promise<string | null> {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
    return currentToken || null;
  } catch (e) {
    console.error('FCM token error:', e); return null;
  }
}
