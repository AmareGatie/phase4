// we're importing the core Firebase library, as well as the
// functions for authentication and the Firestore database
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration for the Firebase project you created in the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyAplIgXip70vuP3xBtCrIIKqvGkJen2QI0",
  authDomain: "finto-56024.firebaseapp.com",
  projectId: "finto-56024",
  storageBucket: "finto-56024.appspot.com",
  messagingSenderId: "499668546704",
  appId: "1:499668546704:web:81d74e0a37e478fcb71415",
  measurementId: "G-1KYH6XJ6TP",
};

// Initialize the Firebase app. This creates a new instance of the Firebase app, which is the entry point for all  Firebase functionality
const app = firebase.initializeApp(firebaseConfig);

// Get the authentication service for signing in and out of your app
export const auth = getAuth(app);

// Get the Firestore database for storing and retrieving data
export const db = app.firestore();

