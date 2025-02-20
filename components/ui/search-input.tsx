'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({ onSearch, placeholder = 'Search...', className = '' }: SearchInputProps) {
  const [query, setQuery] = useState('')

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className={`relative rounded-md shadow-sm ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        id="search-input"
        name="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
    </div>
  )
}
