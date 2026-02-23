import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StorageTabs from './Storage'
import type { StorageOption } from '@/types'

const options: StorageOption[] = [
  { capacity: '128GB', price: 799 },
  { capacity: '256GB', price: 899 },
  { capacity: '512GB', price: 999 },
]

describe('StorageTabs', () => {
  it('renders all storage options', () => {
    render(
      <StorageTabs storageOptions={options} selectedStorage="" onSelectStorage={vi.fn()} />,
    )

    expect(screen.getByText('128GB')).toBeInTheDocument()
    expect(screen.getByText('256GB')).toBeInTheDocument()
    expect(screen.getByText('512GB')).toBeInTheDocument()
  })

  it('calls onSelectStorage with price and capacity on click', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <StorageTabs storageOptions={options} selectedStorage="" onSelectStorage={onSelect} />,
    )

    await user.click(screen.getByText('256GB'))
    expect(onSelect).toHaveBeenCalledWith(899, '256GB')
  })

  it('applies --active modifier to the selected storage', () => {
    render(
      <StorageTabs storageOptions={options} selectedStorage="256GB" onSelectStorage={vi.fn()} />,
    )

    const activeBtn = screen.getByText('256GB')
    const inactiveBtn = screen.getByText('128GB')

    expect(activeBtn.className).toContain('storage__tabs-btn--active')
    expect(inactiveBtn.className).not.toContain('storage__tabs-btn--active')
  })

  it('renders no buttons when storageOptions is empty', () => {
    render(
      <StorageTabs storageOptions={[]} selectedStorage="" onSelectStorage={vi.fn()} />,
    )

    expect(screen.queryAllByRole('button')).toHaveLength(0)
  })
})
