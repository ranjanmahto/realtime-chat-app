// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4_XRE2H_o5_89wpDYTJTKHxogbGB6Qv4",
  authDomain: "real-time-chat-app-909d5.firebaseapp.com",
  projectId: "real-time-chat-app-909d5",
  storageBucket: "real-time-chat-app-909d5.appspot.com",
  messagingSenderId: "720151552534",
  appId: "1:720151552534:web:a16b0b2f852f50e478cb37"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth= getAuth();
 export const db= getFirestore();
 export const storage= getStorage();
