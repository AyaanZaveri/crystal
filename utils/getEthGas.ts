import axios from 'axios'
const cheerio = require('cheerio')

export const getEthGas = async (): Promise<string> => {
  const url = 'https://ethgasstation.info/json/ethgasAPI.json'
  const res = await axios.get(url)
  const data = res.data
  const { fast, safeLow } = data
  const gasPrice = fast ? String(fast / 10) : String(safeLow / 10)
  return '⛽️ ~ ' + gasPrice + ' GWEI'
}
