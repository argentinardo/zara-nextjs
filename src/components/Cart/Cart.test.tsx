import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartContext } from '@/context/CartContext'
import Cart from './Cart'
import type { CartItem } from '@/types'

const mockItems: CartItem[] = [
  {
    cartItemId: 'c1',
    brand: 'Samsung',
    name: 'Galaxy S24',
    price: 899,
    storage: '256GB',
    color: 'Black',
    colorUrl: 'https://example.com/s24-black.png',
  },
  {
    cartItemId: 'c2',
    brand: 'Apple',
    name: 'iPhone 16',
    price: 999,
    storage: '128GB',
    color: 'White',
    colorUrl: 'https://example.com/iphone16-white.png',
  },
]

const renderCart = (cart: CartItem[] = mockItems, removeFromCart = vi.fn()) =>
  render(
    <CartContext.Provider value={{ cart, addToCart: vi.fn(), removeFromCart }}>
      <Cart />
    </CartContext.Provider>,
  )

describe('Cart', () => {
  it('renders the cart title with item count', () => {
    renderCart()
    expect(screen.getByText('CART (2)')).toBeInTheDocument()
  })

  it('renders each cart item with brand, name and price', () => {
    renderCart()

    expect(screen.getByText(/Samsung Galaxy S24/)).toBeInTheDocument()
    expect(screen.getByText(/899 EUR/)).toBeInTheDocument()
    expect(screen.getByText(/Apple iPhone 16/)).toBeInTheDocument()
    expect(screen.getByText(/999 EUR/)).toBeInTheDocument()
  })

  it('shows the total price', () => {
    renderCart()
    expect(screen.getByText(/1898\.00 EUR/)).toBeInTheDocument()
  })

  it('calls removeFromCart when delete button is clicked', async () => {
    const user = userEvent.setup()
    const removeFromCart = vi.fn()

    renderCart(mockItems, removeFromCart)

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i })
    await user.click(deleteButtons[0])

    expect(removeFromCart).toHaveBeenCalledWith('c1')
  })

  it('renders empty cart without pay button', () => {
    renderCart([])

    expect(screen.getByText('CART (0)')).toBeInTheDocument()
    expect(screen.queryByText('pay')).not.toBeInTheDocument()
  })

  it('renders "Continue shopping" link pointing to home', () => {
    renderCart()

    const link = screen.getByText('Continue shopping')
    expect(link).toHaveAttribute('href', '/')
  })
})
