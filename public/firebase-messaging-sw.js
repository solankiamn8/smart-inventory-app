importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA67BqPJcXb9U8pPlCsKSm7k3CdT1a2peg",
  authDomain: "smart-inventory-b82cf.firebaseapp.com",
  projectId: "smart-inventory-b82cf",
  storageBucket: "smart-inventory-b82cf.appspot.com", // ✅ fixed
  messagingSenderId: "657915325182",
  appId: "1:657915325182:web:016d477a853f47495093af"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/vite.svg', // ✅ customize if needed
  });
});
