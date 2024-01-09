// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

//existen 2 tipos de acceso a la base de datos, firestore y realtimedatabase
//en este caso se trabajara con firestore
import { getFirestore } from 'firebase/firestore/lite'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3jkVEubdBhVjY5ftT3uR8fzD7iMW4Sao",
  authDomain: "react-notepad-5c0ad.firebaseapp.com",
  projectId: "react-notepad-5c0ad",
  storageBucket: "react-notepad-5c0ad.appspot.com",
  messagingSenderId: "343723751467",
  appId: "1:343723751467:web:5af7213fd899d84e99526e"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );