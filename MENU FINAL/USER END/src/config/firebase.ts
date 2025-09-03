// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN6ZhL_upu2TSUDqLpNu3oGVwsLpBCwK4",
  authDomain: "menu-wala.firebaseapp.com",
  projectId: "menu-wala",
  storageBucket: "menu-wala.firebasestorage.app",
  messagingSenderId: "219359895483",
  appId: "1:219359895483:web:b38062cb7398d3d03e6e9e",
  measurementId: "G-B62JBHPJS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
