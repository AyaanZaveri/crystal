import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getTopCoins } from '../utils/getTopCoins'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  const [topCoins, setTopCoins] = useState([])

  useEffect(() => {
    getTopCoins(1).then(setTopCoins)
  }, [])

  console.log(topCoins)

  return (
    <div className="">
      <Navbar />
      <div className="px-8">
        <h1 className="mt-8 text-2xl font-bold text-white">
          Top Cryptocurrencies by Market Cap
        </h1>
        <table className="mt-2 text-white">
          <tr>
            <th className="py-3 pr-3 text-left">#</th>
            <th className="py-3 pr-3 text-left">Name</th>
            <th className="py-3 pr-3 text-left">Price</th>
          </tr>
          {topCoins.map((coin: any, index: number) => (
            <tr>
              <td className="border-y border-slate-600 py-3 pr-3 text-left">
                {index + 1}
              </td>
              <td className="border-y border-slate-600 py-3 pr-3 text-left">
                {coin?.name}
              </td>
              <td className="border-y border-slate-600 py-3 pr-3 text-left">
                {coin?.current_price}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Home
