// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration (replace with your Firebase project credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDIKaP6wqUGG_rbJ-SZSjEFzGqJZyzjuws",
  authDomain: "authentication-59334.firebaseapp.com",
  projectId: "authentication-59334",
  storageBucket: "authentication-59334.appspot.com",
  messagingSenderId: "457782083180",
  appId: "1:457782083180:web:0641f4bccf00c58d026249",
  measurementId: "G-T166HW1HPS",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

export { auth }
