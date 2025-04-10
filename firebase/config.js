// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNtzeaGiMs000DgLv1SoIkwG8HP81cXnw",
  authDomain: "vasyleon-af5b1.firebaseapp.com",
  projectId: "vasyleon-af5b1",
  storageBucket: "vasyleon-af5b1.firebasestorage.app",
  messagingSenderId: "328470736993",
  appId: "1:328470736993:web:3fe5452152d6c9e7dc3a20",
  measurementId: "G-8JCM0QVH80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };