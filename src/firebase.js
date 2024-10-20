import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication
const auth = getAuth(app)

// Set up an observer on the Auth object
onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in
    const email = user.email // Get the user's email

    console.log("User email:", email)
  } else {
    // User is signed out
    console.log("No user is signed in.")
  }
})

export { auth }
