'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getSharedData } from "@/lib/api"
import SearchBar from "@/components/SearchBar"
import StudentTable from "@/components/StudentTable"

interface Student {
  email: string
  first_name: string
  last_name: string
  roll_no: string
}

export default function PublicSharePage() {
  const params = useParams()
  const token = params.token as string

  const [students, setStudents] = useState<Student[]>([])
  const [filtered, setFiltered] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setError("No share token provided.")
      setLoading(false)
      return
    }

    getSharedData(token)
      .then((data) => {
        setStudents(data)
        setFiltered(data)
      })
      .catch((err) => setError(err.message || "Failed to fetch shared data."))
      .finally(() => setLoading(false))
  }, [token])

  const handleSearch = (query: string) => {
    const q = query.toLowerCase()
    const results = students.filter((student) =>
      student.email.toLowerCase().includes(q)
    )
    setFiltered(results)
  }

  return (
    <main className="p-6 sm:p-10 min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Data</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && (
        <>
          <SearchBar onSearch={handleSearch} />
          <StudentTable data={filtered} />
        </>
      )}
    </main>
  )
}
