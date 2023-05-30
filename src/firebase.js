// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD7BQboQYekAZH0-vvjYTj5UoV4rL5l8iM",
  authDomain: "rubrica-bp.firebaseapp.com",
  projectId: "rubrica-bp",
  storageBucket: "rubrica-bp.appspot.com",
  messagingSenderId: "467169634501",
  appId: "1:467169634501:web:455af05eda4e7ef53e68ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}