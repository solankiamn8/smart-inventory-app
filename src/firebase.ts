import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA67BqPJcXb9U8pPlCsKSm7k3CdT1a2peg",
  authDomain: "smart-inventory-b82cf.firebaseapp.com",
  projectId: "smart-inventory-b82cf",
  storageBucket: "smart-inventory-b82cf.appspot.com", // ✅ fixed
  messagingSenderId: "657915325182",
  appId: "1:657915325182:web:016d477a853f47495093af"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export async function requestFCMToken(): Promise<string | null> {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: 'BOJ_tUXyZE0i_IJnTFkaodIviJgI327E3Z9IJxp0gskuc1xSC5-cZRolmraPWCvBysabvEY1il7hSD6U31J0m-8'
    });
    return currentToken || null;
  } catch (e) {
    console.error('FCM token error:', e);
    return null;
  }
}
