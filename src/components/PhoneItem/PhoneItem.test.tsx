import { render, screen } from '@testing-library/react'
import PhoneItem from './PhoneItem'
import type { PhoneListItem } from '@/types'

const mockPhone: PhoneListItem = {
  id: 'phone-1',
  brand: 'Samsung',
  name: 'Galaxy S24',
  basePrice: 899,
  imageUrl: 'https://example.com/s24.png',
}

describe('PhoneItem', () => {
  it('renders brand, name, price and image', () => {
    render(<PhoneItem phone={mockPhone} />)

    expect(screen.getByText('Samsung')).toBeInTheDocument()
    expect(screen.getByText(/Galaxy S24/)).toBeInTheDocument()
    expect(screen.getByText(/899/)).toBeInTheDocument()
    expect(screen.getByAltText('Samsung Galaxy S24')).toHaveAttribute('src', mockPhone.imageUrl)
  })

  it('links to the product detail page', () => {
    render(<PhoneItem phone={mockPhone} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/products/phone-1')
  })
})
