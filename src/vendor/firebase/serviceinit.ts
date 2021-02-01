import firebase from '@/vendor/firebase'

// Add the Firebase services that you want to use
// Database
import 'firebase/database'

// Authentication
import 'firebase/auth'
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('The user is signed in; uid = ' + user.uid)
    sessionStorage.setItem('instagram-clone-uid', user.uid)
  } else {
    console.log('No user is signed in')
  }
})

// Storage
import 'firebase/storage'
