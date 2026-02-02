'use client'

import { useEffect } from 'react'
import Clarity from '@microsoft/clarity'

const ClarityInit = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'nautilusshipping.com') {
      Clarity.init('vazyjvmmus')
    }
  }, [])

  return null
}

export default ClarityInit