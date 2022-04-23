import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getTopCoins } from '../utils/getTopCoins'
import Navbar from '../components/Navbar'
import { HiOutlineStar } from 'react-icons/hi'
import BlueBlur from '../public/blur-blue.svg'

const Home: NextPage = () => {
  const [topCoins, setTopCoins] = useState([])

  useEffect(() => {
    getTopCoins(1).then(setTopCoins)
  }, [])

  console.log(topCoins)

  return (
    <div className="pb-16">
      <Navbar />
      <div className="fixed left-0 bottom-0 -z-10 h-20 w-20 rounded-full bg-sky-500 blur-3xl"></div>
      <div className="px-8">
        <h1 className="mt-8 text-2xl font-bold text-white">
          Top Cryptocurrencies by Market Cap
        </h1>
        <table className="mt-2 w-full text-left text-white">
          <tr>
            <th className="py-3 text-left">#</th>
            <th className="py-3 text-left">Name</th>
            <th className="py-3 text-left">Price</th>
            <th className="py-3 text-left">24h</th>
          </tr>
          {topCoins.map((coin: any, index: number) => (
            <tr>
              <td className="border-y border-slate-500 py-5 text-left">
                {index + 1}
              </td>
              <td className="border-y border-slate-500 text-left">
                <div className="inline-flex items-center gap-2">
                  <img
                    className="w-5"
                    src={
                      coin?.image
                        ? coin?.image
                        : 'https://via.placeholder.com/150'
                    }
                    alt=""
                  />
                  <span>{coin?.name}</span>
                  <span className="h-min rounded-sm bg-slate-800 px-1.5 text-sm text-slate-400">
                    {coin?.symbol?.toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="border-y border-slate-500 text-left">
                {coin?.current_price}
              </td>
              <td className="border-y border-slate-500 text-left">
                {coin?.price_change_percentage_24h}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Home
