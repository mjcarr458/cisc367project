// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW_8MFqlh1VD4vqQ_s8LBuqM38ant4C7U",
  authDomain: "cisc367project.firebaseapp.com",
  projectId: "cisc367project",
  storageBucket: "cisc367project.appspot.com",
  messagingSenderId: "156342850958",
  appId: "1:156342850958:web:af76c6d2896ef15d40c0df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);