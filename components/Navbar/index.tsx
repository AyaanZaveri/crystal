import React from 'react'
import BlueBlur from '../../public/blur-blue.svg'

const Navbar = () => {
  return (
    <div className="h-20 w-full overflow-hidden border-b border-slate-600 font-['Inter']">
      <BlueBlur className="absolute left-0 h-20" />
      <BlueBlur className="absolute right-0 -z-10 h-20 -scale-x-[1]" />
      <div className="flex h-full w-full items-center justify-between px-8">
        <h1 className="font-mono text-2xl text-white">Crystal</h1>
        <input
          placeholder="Search"
          className="w-72 rounded-md bg-slate-800 py-2 px-4 text-sm text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-sky-700 active:bg-slate-900"
        />
      </div>
    </div>
  )
}

export default Navbar
