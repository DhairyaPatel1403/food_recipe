// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore';
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFmVEzEi5z3s3ZkfIHMnZ5aAG0Z6SACdA",
  authDomain: "recipe-project-4271b.firebaseapp.com",
  projectId: "recipe-project-4271b",
  storageBucket: "recipe-project-4271b.appspot.com",
  messagingSenderId: "945207560158",
  appId: "1:945207560158:web:2ae76f88efa1cd78d83f4f"
};



export default firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);


export const auth = firebase.auth();

export const storage = getStorage();

export const db = getFirestore(app);