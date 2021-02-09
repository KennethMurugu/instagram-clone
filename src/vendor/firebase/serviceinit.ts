import firebase from '@/vendor/firebase'

// Add the Firebase services that you want to use
// Database
import 'firebase/database'

// Authentication
import 'firebase/auth'
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

// Storage
import 'firebase/storage'
