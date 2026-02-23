'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import { CartContext } from '@/context/CartContext'

const MainBar = () => {
  const { cart } = useContext(CartContext)
  const pathname = usePathname()
  const router = useRouter()
  const isProductSpecs = pathname ? /^\/products\/[^/]+$/.test(pathname) : false

  return (
    <nav className="main-bar" aria-label="Main navigation">
      <Link href="/">
        <img className="main-bar__logo" src="/logo.svg" alt="" />
      </Link>
      <Link className="main-bar__cart-badge" href="/cart">
        <img className="main-bar__cart-icon" src={cart.length > 0 ? '/cart-fill.svg' : '/cart-empty.svg'} />
        <span className="main-bar__cart-text">{cart.length}</span>
      </Link>
      {isProductSpecs && (
        <div className="main-bar__footer">
          <button
            className="main-bar__back"
            onClick={() => router.back()}
            aria-label="Volver"
          ><img src="/chevron-left.svg" alt="" />back
          </button>
        </div>
      )}
    </nav>
  )
}
export default MainBar
