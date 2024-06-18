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
  authDomain: "newchat-app-fcf52.firebaseapp.com",
  projectId: "newchat-app-fcf52",
  storageBucket: "newchat-app-fcf52.appspot.com",
  messagingSenderId: "749268307645",
  appId: "1:749268307645:web:2e729755000c3dc33331d4"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const auth= getAuth();
 export const db= getFirestore();
 export const storage= getStorage();
