import type { Metadata } from 'next'
import { CartProvider } from '@/context/CartContext'
import MainBar from '@/components/MainBar/MainBar'

import '@/styles/reset.css'
import '@/styles/tokens.css'
import '@/styles/components.css'
import '@/components/Layout/Layout.css'

export const metadata: Metadata = {
  title: 'ZARA - Phone Store',
  description: 'Tienda de móviles ZARA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <header>
            <MainBar />
          </header>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
