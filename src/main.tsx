import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes';
import './styles/index.css'; // Tailwind and global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);

import { messaging, requestFCMToken } from './firebase';
import { onMessage } from 'firebase/messaging';

requestFCMToken().then((token) => {
  if (token) console.log('🔐 FCM Token:', token);
});

onMessage(messaging, (payload) => {
  console.log('🔔 Foreground notification:', payload);
  alert(payload.notification?.title);
});

