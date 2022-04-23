import axios from 'axios'

export const getTopCoins = async (page: number): Promise<any> => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`
  const res = await axios.get(url)
  return res.data
}
