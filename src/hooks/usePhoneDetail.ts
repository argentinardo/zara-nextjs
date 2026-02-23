'use client'

import { useState, useContext } from 'react'
import { useRouter } from 'next/navigation'
import type { Phone } from '@/types'
import { CartContext } from '@/context/CartContext'

export const usePhoneDetail = (phone: Phone) => {
  const { addToCart } = useContext(CartContext)
  const router = useRouter()

  const [colorUrl, setColorUrl] = useState(phone.colorOptions[0]?.imageUrl ?? '')
  const [selectedColor, setSelectedColor] = useState('')
  const [storagePrice, setStoragePrice] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState('')

  const handleColor = (imageUrl: string, colorName: string) => {
    setColorUrl(imageUrl)
    setSelectedColor(colorName)
  }

  const handleStorage = (price: number, capacity: string) => {
    setStoragePrice(price)
    setSelectedStorage(capacity)
  }

  const handleAddToCart = () => {
    addToCart({
      cartItemId: '',
      brand: phone.brand,
      name: phone.name,
      price: storagePrice,
      storage: selectedStorage,
      color: selectedColor,
      colorUrl,
    })
    router.push('/cart')
  }

  const displayedImageUrl = colorUrl || phone.colorOptions[0]?.imageUrl || ''
  const canAddToCart = !!selectedColor && !!selectedStorage

  return {
    displayedImageUrl,
    selectedColor,
    selectedStorage,
    storagePrice,
    canAddToCart,
    handleColor,
    handleStorage,
    handleAddToCart,
  }
}
