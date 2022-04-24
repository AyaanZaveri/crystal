import axios from 'axios'
const cheerio = require('cheerio')

export const getMoonPhase = async (): Promise<string> => {
  const { data } = await axios.get('https://www.coingecko.com/')
  const base = 'https://nineplanets.org'
  const $ = cheerio.load(data)
  const moonPhase = $(
    'body > main > section.section.has-background-info-light > div > div > div.column.has-text-centered > div > img'
  ).attr('src')
  return base + moonPhase
}
