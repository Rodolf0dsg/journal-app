// Import the functions you need from the SDKs you need
import { MediationTwoTone } from "@mui/icons-material";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

//existen 2 tipos de acceso a la base de datos, firestore y realtimedatabase
//en este caso se trabajara con firestore
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments(); 

// console.log({VITE_APIKEY, VITE_AUTHDOMAIN ,VITE_PROJECTID ,VITE_STORAGEBUCKET, VITE_MESSAGINGSENDERID, VITE_APPID});


// Your web app's Firebase configuration
//Production
// const firebaseConfig = {
//   apiKey: "AIzaSyB3jkVEubdBhVjY5ftT3uR8fzD7iMW4Sao",
//   authDomain: "react-notepad-5c0ad.firebaseapp.com",
//   projectId: "react-notepad-5c0ad",
//   storageBucket: "react-notepad-5c0ad.appspot.com",
//   messagingSenderId: "343723751467",
//   appId: "1:343723751467:web:5af7213fd899d84e99526e"
// };

//development (tests)

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDAh-RtT4kD1vNQtEtO54xZtuobIRLqsOI",
//   authDomain: "react-notepad-tests.firebaseapp.com",
//   projectId: "react-notepad-tests",
//   storageBucket: "react-notepad-tests.appspot.com",
//   messagingSenderId: "797042400364",
//   appId: "1:797042400364:web:50ee132c327dd4e6d40c49"
// };

//tests
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );