// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn_zuLmxTM4PZYBq6jpYYlxX7dzw1CEA4",
  authDomain: "int305fb-moomost123.firebaseapp.com",
  projectId: "int305fb-moomost123",
  storageBucket: "int305fb-moomost123.firebasestorage.app",
  messagingSenderId: "895352323490",
  appId: "1:895352323490:web:4d14e8543114e5ee4e86fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
