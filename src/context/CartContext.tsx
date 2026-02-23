'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'
import type { CartItem } from '@/types/phone'

interface CartContextType {
  cart: CartItem[]
  addToCart: (phone: CartItem) => void
  removeFromCart: (cartItemId: string) => void
}

interface childrenNode {
  children: ReactNode
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
})

export const CartProvider = ({ children }: childrenNode) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      setCart(JSON.parse(saved))
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  const addToCart = (phone: CartItem) => {
    phone.cartItemId = crypto.randomUUID()
    setCart([...cart, phone])
  }
  const removeFromCart = (cartItemId: string) =>
    setCart(cart.filter((p: CartItem) => p.cartItemId !== cartItemId))

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
