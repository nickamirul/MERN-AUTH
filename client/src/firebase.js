// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-1ffa2.firebaseapp.com",
  projectId: "mern-auth-1ffa2",
  storageBucket: "mern-auth-1ffa2.firebasestorage.app",
  messagingSenderId: "1077085156858",
  appId: "1:1077085156858:web:1788afba985613a4342043"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);