// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getauth } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdADwm0hTseRBLf-rYJIqc2FuFbvVKHNs",
  authDomain: "studymate-2927e.firebaseapp.com",
  projectId: "studymate-2927e",
  storageBucket: "studymate-2927e.firebasestorage.app",
  messagingSenderId: "984572010781",
  appId: "1:984572010781:web:deaef44bfb98105eea41f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getauth(app);
