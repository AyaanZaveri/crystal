import React, { useEffect, useState } from 'react'
import { getSearch } from '../../utils/getSearch'

const Navbar = () => {
  const [input, setInput] = useState('')
  const [searchRes, setSearchRes] = useState<any>([])

  useEffect(() => {
    getSearch(input).then((res: any) => {
      setSearchRes(res?.coins?.slice(0, 5))
    })
  }, [input])

  console.log(searchRes)

  return (
    <div className="h-20 w-full border-b border-slate-600 font-['Inter']">
      <div className="absolute left-0 -z-10 h-24 w-24 rounded-full bg-sky-500 blur-3xl"></div>
      <div className="absolute right-0 -z-10 h-16 w-16 rounded-full bg-purple-500 blur-2xl"></div>

      <div className="flex h-full w-full items-center justify-between px-8">
        <h1 className="font-mono text-2xl text-white">Crystal</h1>
        <div>
          <input
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
            className="w-72 rounded-md bg-slate-800 py-2 px-4 text-sm text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-sky-700 active:bg-slate-900"
          />
          {searchRes.length > 0 && input.length > 0 ? (
            <ul className="absolute mt-3 w-72 overflow-hidden rounded-lg bg-slate-900/80 shadow-xl backdrop-blur">
              {searchRes?.map((res: any) => (
                <li
                  className="flex cursor-pointer items-center overflow-hidden p-3 text-white transition duration-300 ease-in-out hover:bg-sky-500/5"
                  onClick={() =>
                    (location.href = `/crypto/${res?.name.toLowerCase()}`)
                  }
                >
                  <div className="inline-flex items-center gap-2">
                    <img
                      className="w-5 rounded-full"
                      src={
                        res?.thumb
                          ? res?.thumb
                          : 'https://via.placeholder.com/150'
                      }
                      alt=""
                    />
                    <span>{res?.name}</span>

                    <span className="h-min cursor-default rounded-sm bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-sky-500 hover:text-white">
                      {res?.symbol?.toUpperCase()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Navbar
