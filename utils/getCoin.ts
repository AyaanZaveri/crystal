import axios from 'axios'

export const getCoin = async (coin: string): Promise<any> => {
  const url = `https://cors-anywhere-production-c185.up.railway.app/https://api.coingecko.com/api/v3/coins/${coin}`
  const res = await axios.get(url)
  return res.data
}
