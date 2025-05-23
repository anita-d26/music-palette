// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVFpBJ47sMR4Kgsfm-q4uZOSdnZaUNNS0",
  authDomain: "chromatone-b2d32.firebaseapp.com",
  projectId: "chromatone-b2d32",
  storageBucket: "chromatone-b2d32.firebasestorage.app",
  messagingSenderId: "1036646536820",
  appId: "1:1036646536820:web:839c47d3125f3a7655a321",
  measurementId: "G-Q40M2ECDKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };