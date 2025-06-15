import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes';
import './styles/index.css'; // Tailwind and global styles

import { messaging, requestFCMToken } from './firebase';
import { onMessage } from 'firebase/messaging'; // ✅ Correct import

// Mount the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);

// Request FCM token
requestFCMToken().then((token) => {
  if (token) {
    console.log('✅ FCM token:', token);
    // send token to backend if needed
  } else {
    console.warn('❌ No FCM token received');
  }
});

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log('📩 Foreground message received:', payload);
  alert(payload.notification?.title); // Optional: Replace with custom toast
});

// Ask notification permission once at load
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('🔔 Notification permission granted.');
  } else {
    console.log('🔕 Notification permission denied.');
  }
});
