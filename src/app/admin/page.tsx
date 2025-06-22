'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { generateShareToken } from "@/lib/api"

export default function AdminPage() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [shareToken, setShareToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/admin/login")
    } else {
      setAccessToken(token)
    }
  }, [router])

  const handleGenerate = async () => {
    if (!accessToken) return

    setLoading(true)
    setError(null)
    setShareToken(null)

    try {
      const { shareToken } = await generateShareToken(accessToken)
      setShareToken(shareToken)
    } catch (err: any) {
      setError(err.message || "Failed to generate share link.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10 gap-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-red-800 text-white font-semibold px-6 py-2 rounded hover:bg-red-900 transition disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Share Link"}
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/admin/login");
        }}
        className="text-sm underline text-gray-600 hover:text-red-800 transition delay-200"
      >
        Logout
      </button>

      {shareToken && (
        <div className="text-sm text-center break-all max-w-xl text-green-700">
          Shareable Link:
          <a
            href={`/share/${shareToken}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block underline mt-2 text-blue-700"
          >
            {`${typeof window !== 'undefined' ? window.location.origin : ''}/share/${shareToken}`}
          </a>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </main>
  )
}
