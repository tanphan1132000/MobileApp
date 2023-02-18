// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA89e4DHvLfcz63tccU9rGkeRbSyTIKihA",
  authDomain: "chapapp-d51cd.firebaseapp.com",
  projectId: "chapapp-d51cd",
  storageBucket: "chapapp-d51cd.appspot.com",
  messagingSenderId: "58605940974",
  appId: "1:58605940974:web:ac77b735bd00c58a9e43ff",
  measurementId: "G-TZ3EPZVXJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { auth, createUserWithEmailAndPassword };