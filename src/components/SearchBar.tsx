'use client'

interface Props {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <div className="mb-6 max-w-md w-full">
      <input
        type="text"
        placeholder="Search by email..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 shadow-md"
      />
    </div>
  )
}
