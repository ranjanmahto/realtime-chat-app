// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "reactchat-app-b1339.firebaseapp.com",
  projectId: "reactchat-app-b1339",
  storageBucket: "reactchat-app-b1339.appspot.com",
  messagingSenderId: "888283122945",
  appId: "1:888283122945:web:42257b5b282cb2dad49f00"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth= getAuth();
 export const db= getFirestore();
 export const storage= getStorage();
