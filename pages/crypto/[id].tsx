import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { getCoin } from '../../utils/getCoin'
import axios from 'axios'
import { formatPrice } from '../../utils/formatPrice'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import { DateTime } from 'luxon'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { SiReddit, SiTwitter } from 'react-icons/si'
import { HiOutlineGlobeAlt } from 'react-icons/hi'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const CryptoID = ({ cryptoData, chartData }: any) => {
  const router = useRouter()

  const unixToDate = (unix: number) => {
    return DateTime.fromMillis(unix).toFormat('MMMM dd, yyyy')
  }

  let chartX: any = []
  let chartY: any = []

  chartData.map((item: any) => {
    chartX.push(unixToDate(item[0]))
    chartY.push(item[1])
  })

  console.log(chartX)

  return (
    <div className="pb-16">
      <Navbar />
      <div className="fixed left-0 bottom-0 -z-10 h-20 w-20 rounded-full bg-pink-500 blur-3xl"></div>
      <div className="fixed right-0 bottom-0 -z-10 h-16 w-16 rounded-full bg-emerald-500 blur-2xl"></div>
      <div className="mt-8 flex flex-row flex-wrap px-8">
        <div className="flex w-full flex-col gap-3 md:w-8/12">
          <div className="inline-flex items-center gap-2">
            <img
              className="w-8 rounded-full transition duration-300 ease-in-out hover:rotate-12"
              src={
                cryptoData?.image?.large
                  ? cryptoData?.image?.large
                  : 'https://via.placeholder.com/150'
              }
              alt=""
            />
            <h1 className="text-2xl font-bold text-white">
              {cryptoData?.name}
            </h1>
            <span className="h-min cursor-default rounded bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-sky-500 hover:text-white">
              {cryptoData?.symbol?.toUpperCase()}
            </span>
            <span className="h-min cursor-default rounded bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-purple-500 hover:text-white">
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
            <h1
              className={`text-xl font-bold ${
                cryptoData?.market_data.price_change_percentage_24h > 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {cryptoData?.market_data.price_change_percentage_24h.toFixed(2)}
            </h1>
          </div>

          <div>
            <Line
              data={{
                labels: chartX,
                datasets: [
                  {
                    data: chartY,
                    pointRadius: 1,
                    borderColor: '#0ea5e9',
                    label: 'Price',
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: 'white',
                    },
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      color: 'white',
                    },
                  },
                  x: {
                    ticks: {
                      color: 'white',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">Information</h1>
          <div className="flex flex-row items-center gap-3">
            <span className="text-slate-300">Website</span>
            <a target="_blank" href={cryptoData?.links?.homepage[0]}>
            <span className="inline-flex h-min cursor-pointer items-center gap-1 rounded bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-emerald-500 hover:text-white">
              <HiOutlineGlobeAlt className="h-3 w-3 text-slate-300" />
                {cryptoData?.links?.homepage[0]}
              </span>
            </a>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="text-slate-300">Community</span>
            <a target="_blank" href={cryptoData?.links?.subreddit_url}>
              <span className="inline-flex h-min cursor-pointer items-center gap-1 rounded bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-orange-500 hover:text-white">
                <SiReddit className="h-3 w-3 text-slate-300" />
                Reddit
              </span>
            </a>
            <a
              target="_blank"
              href={
                'https://twitter.com/' + cryptoData?.links?.twitter_screen_name
              }
            >
              <span className="inline-flex h-min cursor-pointer items-center gap-1 rounded bg-slate-800 px-1.5 text-sm text-slate-400 duration-300 hover:bg-sky-500 hover:text-white">
                <SiTwitter className="h-3 w-3 text-slate-300" />
                Twitter
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.query

  const { data: cryptoData } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}`
  )

  const { data: chartData } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`
  )

  return {
    props: {
      cryptoData: cryptoData,
      chartData: chartData.prices,
    },
  }
}

export default CryptoID
