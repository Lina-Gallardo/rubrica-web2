// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBWM1Dcb_gWbHG3GRcyYLwKz-vXchBz5fA",
  authDomain: "rubrica-web2-aa7fb.firebaseapp.com",
  projectId: "rubrica-web2-aa7fb",
  storageBucket: "rubrica-web2-aa7fb.appspot.com",
  messagingSenderId: "965755189720",
  appId: "1:965755189720:web:9bf272cf525560a0dcdaad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}