// we're importing the core Firebase library, as well as the
// functions for authentication and the Firestore database
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";

// Your web app's Firebase configuration for the Firebase project you created in the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyCGtinmGbQrgd-eafZ2Ah_ixXmqKEuiyCk",
  authDomain: "sep-449604.firebaseapp.com",
  projectId: "sep-449604",
  storageBucket: "sep-449604.firebasestorage.app",
  messagingSenderId: "90052952206",
  appId: "1:90052952206:web:14c6b97cc98119980909df",
  measurementId: "G-17JFSPSBWH",
};

// Initialize the Firebase app. This creates a new instance of the Firebase app, which is the entry point for all  Firebase functionality
const app = firebase.initializeApp(firebaseConfig);

// Get the authentication service for signing in and out of your app
export const auth = getAuth(app);

// Get the Firestore database for storing and retrieving data
export const db = app.firestore;
