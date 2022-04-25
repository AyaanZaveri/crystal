import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDsQqkLP9bi_NZbUo-UW05zkWvBygYddq4',
  authDomain: 'crypto-3e0da.firebaseapp.com',
  projectId: 'crypto-3e0da',
  storageBucket: 'crypto-3e0da.appspot.com',
  messagingSenderId: '1034335202241',
  appId: '1:1034335202241:web:d6a774a0564401f5f65d40',
  measurementId: 'G-QH5G8ZVZ4X',
}

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0]
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()
const db = getFirestore(firebaseApp)

export { auth, provider, db }
