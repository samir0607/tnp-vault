'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { generateShareToken } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
export default function AdminPage() {
  const router = useRouter()
  const accessToken = useAuth()
  const [shareTokens, setShareTokens] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("shareTokens")
    if (saved) {
      const validTokens = JSON.parse(saved).filter((token: string) => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          return Date.now() < payload.exp * 1000
        } catch {
          return false
        }
      })
      setShareTokens(validTokens)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("shareTokens", JSON.stringify(shareTokens))
  }, [shareTokens])

  const handleGenerate = async () => {
    if (!accessToken) return

    setLoading(true)
    setError(null)

    try {
      const { shareToken } = await generateShareToken(accessToken)
      setShareTokens(prev => [shareToken, ...prev]) 
    } catch (err: any) {
      setError(err.message || "Failed to generate share link.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("shareTokens")
    router.push("/admin/login")
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
        onClick={handleLogout}
        className="text-sm underline text-gray-600 hover:text-red-800 transition delay-200"
      >
        Logout
      </button>

      {shareTokens.length > 0 && (
        <div className="w-full max-w-2xl mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-center text-green-700">Generated Links</h2>
          {shareTokens.map((token, idx) => {
          const link = `${window.location.origin}/share/${token}`
          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded gap-2"
            >
              <div className="break-all text-blue-700 underline max-w-full sm:max-w-[70%]">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    setShareTokens(prev => prev.filter((_, i) => i !== idx));
                  }}
                  className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                >
                  🗑️ Delete
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(link)
                    setCopiedIndex(idx)
                    setTimeout(() => setCopiedIndex(null), 2000)
                  }}
                  className={`text-white text-sm px-3 py-1 rounded transition ${
                    copiedIndex === idx ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {copiedIndex === idx ? 'Copied!' : '📋 Copy'}
                </button>

              </div>
            </div>
          )
        })}
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </main>
  )
}

