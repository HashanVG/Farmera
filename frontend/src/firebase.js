// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwnPQPChqXlx0J38UZ537x8k4FUAXkBDI",
  authDomain: "farmera-5ecc9.firebaseapp.com",
  projectId: "farmera-5ecc9",
  storageBucket: "farmera-5ecc9.firebasestorage.app",
  messagingSenderId: "976165352674",
  appId: "1:976165352674:web:bbe2bd9d25efa29d8f5abb",
  measurementId: "G-TJN7QGEZCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
