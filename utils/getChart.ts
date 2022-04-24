import axios from 'axios'

export const getCoin = async (coin: string, days: number = 14): Promise<any> => {
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14`
  const res = await axios.get(url)
  return res.data
}
