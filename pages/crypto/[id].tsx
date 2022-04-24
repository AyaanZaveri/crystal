import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { getCoin } from '../../utils/getCoin'
import axios from 'axios'
import { formatPrice } from '../../utils/formatPrice'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

const CryptoID = ({ cryptoData }: any) => {
  const router = useRouter()

  console.log(cryptoData)

  return (
    <div>
      <Navbar />
      <div className="fixed left-0 bottom-0 -z-10 h-20 w-20 rounded-full bg-pink-500 blur-3xl"></div>
      <div className="fixed right-0 bottom-0 -z-10 h-16 w-16 rounded-full bg-emerald-500 blur-2xl"></div>
      <div className="flex flex-col gap-3 px-8">
        <div className="mt-8 inline-flex items-center gap-2">
          <img
            className="w-8 rounded-full transition duration-300 ease-in-out hover:rotate-12"
            src={
              cryptoData?.image?.large
                ? cryptoData?.image?.large
                : 'https://via.placeholder.com/150'
            }
            alt=""
          />
          <h1 className="text-2xl font-bold text-white">{cryptoData?.name}</h1>
          <span className="h-min cursor-default rounded bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-sky-500 hover:text-white">
            {cryptoData?.symbol?.toUpperCase()}
          </span>
          <span className="h-min cursor-default rounded bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-sky-500 hover:text-white">
            Rank #{cryptoData?.market_cap_rank}
          </span>
        </div>

        <div className="inline-flex items-center gap-1">
          <h1 className="text-3xl font-bold text-white">
            {formatPrice(cryptoData?.market_data.current_price.usd)}
          </h1>
          {cryptoData?.market_data.price_change_percentage_24h > 0 ? (
            <FaCaretUp className="h-8 w-8 text-green-400" />
          ) : (
            <FaCaretDown className="h-8 w-8 text-red-400" />
          )}
          <h1 className={`text-xl font-bold ${cryptoData?.market_data.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>
            {cryptoData?.market_data.price_change_percentage_24h.toFixed(2)}
          </h1>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.query

  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}`
  )

  return {
    props: {
      cryptoData: data,
    },
  }
}

export default CryptoID
