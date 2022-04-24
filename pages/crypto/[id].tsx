import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { getCoin } from '../../utils/getCoin'

const CryptoID = () => {
  const router = useRouter()
  const [cryptoData, setCryptoData] = useState<any>({})

  const { id } = router.query

  useEffect(() => {
    getCoin(id as string).then(setCryptoData)
  }, [])

  console.log(cryptoData)

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default CryptoID
