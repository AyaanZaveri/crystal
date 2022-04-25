import React from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {
  return (
    <div className="grid h-screen place-content-center place-items-center gap-5 font-['Inter']">
      <h1 className="text-5xl font-bold text-white">
        Welcome to <span className="font-mono text-white font-normal">Crystal</span>
      </h1>
      <button
        className="rounded-md bg-slate-800/50 py-2 px-4 text-sm text-white placeholder-slate-400 backdrop-blur-sm transition duration-300 ease-in-out hover:bg-slate-800/30 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-sky-700 active:bg-slate-900"
        onClick={() => signInWithPopup(auth, provider)}
      >
        Sign-In with Google
      </button>
    </div>
  )
}

export default Login
