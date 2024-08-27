// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu_ILERQg_XYbVpeWr-u5TZWJJKSd4oKM",
  authDomain: "flashcardsaas-6706c.firebaseapp.com",
  projectId: "flashcardsaas-6706c",
  storageBucket: "flashcardsaas-6706c.appspot.com",
  messagingSenderId: "684736203793",
  appId: "1:684736203793:web:e34543219154e5ecbd75b0",
  measurementId: "G-ET250CFX6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);