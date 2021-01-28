// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyDtIntdZTM8fEYCSVpg_TG_J3zLSb-It64",
    authDomain: "instagram-clone-vue-firebase.firebaseapp.com",
    projectId: "instagram-clone-vue-firebase",
    storageBucket: "instagram-clone-vue-firebase.appspot.com",
    messagingSenderId: "367689805296",
    appId: "1:367689805296:web:3560c793a1aca6f566c135"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase

// Add the Firebase services that you want to use
// Database
import 'firebase/database'

// Authentication
import 'firebase/auth'
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
firebase.auth().onAuthStateChanged((user) =>{
  if (user) {
    console.log('The user is signed in')
  } else {
    console.log('No user is signed in')
  }
});


