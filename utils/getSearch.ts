import axios from 'axios'

export const getSearch = async (query: string): Promise<any> => {
  const url = `https://cors-anywhere-production-c185.up.railway.app/https://api.coingecko.com/api/v3/search?query=${query}`
  const res = await axios.get(url)
  return res.data
}
