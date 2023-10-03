// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOPEr3hFq8fH-vBz_UzdMuvZWLMyFRLvA",
  authDomain: "ourcollection-278e5.firebaseapp.com",
  projectId: "ourcollection-278e5",
  storageBucket: "ourcollection-278e5.appspot.com",
  messagingSenderId: "195495239278",
  appId: "1:195495239278:web:6b428c424bee6889f9d07f",
  measurementId: "G-8MDN17TH40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); //Optionnel

export const auth = getAuth(app) //Auth avec mail et password
export const googleProvider = new GoogleAuthProvider // Auth avec Google

export const db = getFirestore(app) //connection à la db firestore
export const storage = getStorage(app) //Permet d'upload des fichiers sur firebase storage 

