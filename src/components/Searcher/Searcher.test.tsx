import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Searcher from './Searcher'

describe('Searcher', () => {
  it('renders the search input and result count', () => {
    render(<Searcher onSearch={vi.fn()} resultsCount={5} />)

    expect(screen.getByPlaceholderText('Search for a smartphone...')).toBeInTheDocument()
    expect(screen.getByText('5 RESULTS')).toBeInTheDocument()
  })

  it('shows "0 RESULTS" when resultsCount is 0', () => {
    render(<Searcher onSearch={vi.fn()} resultsCount={0} />)
    expect(screen.getByText('0 RESULTS')).toBeInTheDocument()
  })

  it('shows "1 RESULT" (singular) when resultsCount is 1', () => {
    render(<Searcher onSearch={vi.fn()} resultsCount={1} />)
    expect(screen.getByText('1 RESULT')).toBeInTheDocument()
  })

  it('does not call onSearch on first render', () => {
    const onSearch = vi.fn()
    render(<Searcher onSearch={onSearch} resultsCount={0} />)
    expect(onSearch).not.toHaveBeenCalled()
  })

  it('calls onSearch after debounce when user types', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    render(<Searcher onSearch={onSearch} resultsCount={0} />)

    const input = screen.getByPlaceholderText('Search for a smartphone...')
    await user.type(input, 'xiaomi')

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('xiaomi')
    }, { timeout: 1000 })
  })
})
