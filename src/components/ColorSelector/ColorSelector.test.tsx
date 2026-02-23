import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ColorSelector from './ColorSelector'
import type { ColorOption } from '@/types'

const colors: ColorOption[] = [
  { name: 'Black', hexCode: '#000000', imageUrl: 'https://example.com/black.png' },
  { name: 'White', hexCode: '#FFFFFF', imageUrl: 'https://example.com/white.png' },
  { name: 'Blue', hexCode: '#0000FF', imageUrl: 'https://example.com/blue.png' },
]

describe('ColorSelector', () => {
  it('renders all color buttons', () => {
    render(<ColorSelector colorOption={colors} action={vi.fn()} selectedColor="" />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('calls action with imageUrl and name on click', async () => {
    const user = userEvent.setup()
    const action = vi.fn()

    render(<ColorSelector colorOption={colors} action={action} selectedColor="" />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])

    expect(action).toHaveBeenCalledWith('https://example.com/white.png', 'White')
  })

  it('applies --active modifier to the selected color tab', () => {
    render(<ColorSelector colorOption={colors} action={vi.fn()} selectedColor="Blue" />)

    const items = screen.getAllByRole('listitem')
    const blueItem = items[2]
    const blackItem = items[0]

    expect(blueItem.className).toContain('color-selector__tabs-tab--active')
    expect(blackItem.className).not.toContain('color-selector__tabs-tab--active')
  })

  it('displays the selected color name', () => {
    render(<ColorSelector colorOption={colors} action={vi.fn()} selectedColor="Blue" />)
    expect(screen.getByText('Blue')).toBeInTheDocument()
  })
})
