import { render, screen } from '@testing-library/react'
import SimilarItems from './SimilarItems'
import type { SimilarProduct } from '@/types'

const makeSimilar = (count: number): SimilarProduct[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `sim-${i}`,
    brand: `Brand ${i}`,
    name: `Model ${i}`,
    basePrice: 500 + i * 100,
    imageUrl: `https://example.com/sim-${i}.png`,
  }))

describe('SimilarItems', () => {
  it('renders nothing when similarProducts is empty', () => {
    const { container } = render(<SimilarItems similarProducts={[]} />)
    expect(container.innerHTML).toBe('')
  })

  it('renders the title and products', () => {
    render(<SimilarItems similarProducts={makeSimilar(3)} />)

    expect(screen.getByText('SIMILAR ITEMS')).toBeInTheDocument()
    expect(screen.getByText('Model 0')).toBeInTheDocument()
    expect(screen.getByText('Model 2')).toBeInTheDocument()
  })

  it('limits to 6 similar products', () => {
    render(<SimilarItems similarProducts={makeSimilar(10)} />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(6)
  })

  it('each item links to the correct product page', () => {
    render(<SimilarItems similarProducts={makeSimilar(2)} />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/products/sim-0')
    expect(links[1]).toHaveAttribute('href', '/products/sim-1')
  })
})
