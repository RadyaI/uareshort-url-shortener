// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "url-shortener-d4c1a.firebaseapp.com",
    projectId: "url-shortener-d4c1a",
    storageBucket: "url-shortener-d4c1a.firebasestorage.app",
    messagingSenderId: "630312324218",
    appId: "1:630312324218:web:db2b8b8226fa15dc027fc3",
    measurementId: "G-9601VZ45LM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }