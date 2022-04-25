import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getTopCoins } from '../utils/getTopCoins'
import Navbar from '../components/Navbar'
import { HiOutlineStar } from 'react-icons/hi'
import BlueBlur from '../public/blur-blue.svg'
import { formatPrice } from '../utils/formatPrice'

const Home: NextPage = () => {
  const [topCoins, setTopCoins] = useState([])

  useEffect(() => {
    getTopCoins(1).then(setTopCoins)
  }, [])

  console.log(topCoins)

  return (
    <div className="pb-16 ">
      <Navbar />
      <div className="fixed left-0 bottom-0 -z-10 h-20 w-20 rounded-full bg-pink-500 blur-3xl"></div>
      <div className="fixed right-0 bottom-0 -z-10 h-16 w-16 rounded-full bg-emerald-500 blur-2xl"></div>
      <div className="px-8">
        <h1 className="mt-8 text-2xl font-bold text-white">
          Top Cryptocurrencies by Market Cap
        </h1>
        <table className="mt-2 w-full text-left text-white">
          <tr>
            <th className="py-3 pl-3 text-left">#</th>
            <th className="py-3 text-left">Name</th>
            <th className="py-3 text-left">Price</th>
            <th className="py-3 text-left">24h</th>
            <th className="py-3 text-left">Market Cap</th>
            <th className="py-3 text-left">Volume</th>
          </tr>
          {topCoins.map((coin: any, index: number) => (
            <tr
              className="cursor-pointer transition duration-300 ease-in-out hover:bg-sky-500/5"
              onClick={() =>
                (location.href = `/crypto/${coin?.name
                  .toLowerCase()
                  .replace(/ /g, '-')}`)
              }
            >
              <td className="border-y border-slate-600 py-5 pl-3 text-left">
                {index + 1}
              </td>
              <td className="border-y border-slate-600 text-left">
                <div className="inline-flex items-center gap-2">
                  <img
                    className="w-5 rounded-full"
                    src={
                      coin?.image
                        ? coin?.image
                        : 'https://via.placeholder.com/150'
                    }
                    alt=""
                  />
                  <span>{coin?.name}</span>
                  <span className="h-min cursor-default rounded bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-sky-500 hover:text-white">
                    {coin?.symbol?.toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="border-y border-slate-600 text-left">
                {formatPrice(coin?.current_price)}
              </td>
              <td className="border-y border-slate-600 text-left">
                <span
                  className={`${
                    coin?.price_change_percentage_24h > 0
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >{`${coin?.price_change_percentage_24h.toFixed(2)}%`}</span>
              </td>
              <td className="border-y border-slate-600 text-left">
                {formatPrice(coin?.market_cap)}
              </td>
              <td className="border-y border-slate-600 text-left">
                {formatPrice(coin?.total_volume)}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Home
