import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC8xM404wn7-FQQ_TiI4KGK-fEjV19PXvs",
    authDomain: "expense-tracker-5c2ad.firebaseapp.com",
    projectId: "expense-tracker-5c2ad",
    storageBucket: "expense-tracker-5c2ad.appspot.com",
    messagingSenderId: "1019170296442",
    appId: "1:1019170296442:web:9b7766a2c2b6e430b061c3",
    measurementId: "G-4TQ2Z0YB2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);