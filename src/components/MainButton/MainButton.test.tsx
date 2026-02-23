import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MainButton from './MainButton'

describe('MainButton', () => {
  it('renders children as button text', () => {
    render(<MainButton>Añadir</MainButton>)
    expect(screen.getByRole('button', { name: 'Añadir' })).toBeInTheDocument()
  })

  it('calls action on click', async () => {
    const user = userEvent.setup()
    const action = vi.fn()

    render(<MainButton action={action}>Click me</MainButton>)

    await user.click(screen.getByRole('button'))
    expect(action).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is true', () => {
    render(<MainButton disabled>Añadir</MainButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is enabled when disabled prop is false', () => {
    render(<MainButton disabled={false}>Añadir</MainButton>)
    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('applies --light modifier when light is true', () => {
    render(<MainButton light>Añadir</MainButton>)
    expect(screen.getByRole('button').className).toContain('main-button--light')
  })

  it('applies --full modifier when full is true', () => {
    render(<MainButton full>Añadir</MainButton>)
    expect(screen.getByRole('button').className).toContain('main-button--full')
  })

  it('does not apply modifiers by default', () => {
    render(<MainButton>Añadir</MainButton>)
    const btn = screen.getByRole('button')
    expect(btn.className).not.toContain('main-button--light')
    expect(btn.className).not.toContain('main-button--full')
  })

  it('has type="button" to prevent form submission', () => {
    render(<MainButton>Añadir</MainButton>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })
})
