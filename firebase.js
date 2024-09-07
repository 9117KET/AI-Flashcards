// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApoLE8763fkjewtach_iAak34yF8aDYhM",
  authDomain: "flashcardsaas-a7066.firebaseapp.com",
  projectId: "flashcardsaas-a7066",
  storageBucket: "flashcardsaas-a7066.appspot.com",
  messagingSenderId: "1002683879569",
  appId: "1:1002683879569:web:23fd7ee52e0b8bcff2ef30",
  measurementId: "G-2MXX0WVC2Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
