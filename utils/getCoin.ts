import axios from 'axios'

export const getCoin = async (coin: string): Promise<any> => {
  const url = `https://api.coingecko.com/api/v3/coins/${coin}`
  const res = await axios.get(url)
  return res.data
}
