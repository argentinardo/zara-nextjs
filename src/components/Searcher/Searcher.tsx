'use client'

import { useEffect, useRef, useState } from 'react'

export interface SearcherProps {
  onSearch: (term: string) => void | Promise<void>
  resultsCount: number
}

const DEFAULT_DEBOUNCE_MS = 300

const Searcher = ({
  onSearch,
  resultsCount,
}: SearcherProps) => {
  const [query, setQuery] = useState('')
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const timer = setTimeout(() => {
      void onSearch(query)
    }, DEFAULT_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [onSearch, query])

  const countText =
    resultsCount === 0
      ? '0 RESULTS'
      : `${resultsCount} RESULT${resultsCount !== 1 ? 'S' : ''}`

  return (
    <search className="searcher">
      <input
        type="search"
        className="searcher__input"
        placeholder="Search for a smartphone..."
        aria-label="Search for a smartphone"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="searcher__count">
        {countText}
      </p>
    </search>
  )
}

export default Searcher