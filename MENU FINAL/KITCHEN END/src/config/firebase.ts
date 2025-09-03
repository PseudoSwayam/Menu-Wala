import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN6ZhL_upu2TSUDqLpNu3oGVwsLpBCwK4",
  authDomain: "menu-wala.firebaseapp.com",
  projectId: "menu-wala",
  storageBucket: "menu-wala.firebasestorage.app",
  messagingSenderId: "219359895483",
  appId: "1:219359895483:web:87ada748cc40a7033e6e9e",
  measurementId: "G-Q7FDK6K3TX"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// CORRECT: Initialize and export the Firestore database instance
export const db = getFirestore(app);

const analytics = getAnalytics(app); // This can be removed if unused