import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import Loading from '../components/Loading'
import Login from './login'

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth)

  const userRef = collection(db, 'users')

  useEffect(() => {
    if (user) {
      setDoc(
        doc(userRef, user.uid),
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          lastSeen: serverTimestamp(),
          uid: user.uid,
        },
        { merge: true }
      )
    }
  }, [user])

  return <Component {...pageProps} />
}

export default MyApp
