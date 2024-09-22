// src/components/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import the functions
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAteCMEza0nm5xfdJpdpi76zCoJ1Mm-sig",
  authDomain: "user-medication-app316.firebaseapp.com",
  projectId: "user-medication-app316",
  storageBucket: "user-medication-app316.appspot.com",
  messagingSenderId: "67556165754",
  appId: "1:67556165754:web:ea540f6c823adc3d1d93c3",
  measurementId: "G-J8M1GS7RWL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, createUserWithEmailAndPassword, signInWithEmailAndPassword }; // Export functions
