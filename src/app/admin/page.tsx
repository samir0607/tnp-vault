'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { generateShareToken } from "@/lib/api"
import { useAuth } from "@/hooks/useAuth"
export default function AdminPage() {
  type TokenEntry = {
    name: string;
    token: string;
  };

  const router = useRouter()
  const accessToken = useAuth()
  const [shareTokens, setShareTokens] = useState<TokenEntry[]>([])
  const [customName, setCustomName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("shareTokens")
    if (saved) {
      const parsed: TokenEntry[] = JSON.parse(saved)
      const validTokens = parsed.filter(({ token }) => {
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
    if (!accessToken || !customName.trim()) return

    setLoading(true)
    setError(null)

    try {
      const { shareToken } = await generateShareToken(accessToken)
      setShareTokens(prev => [{name: customName.trim(), token: shareToken}, ...prev])
      setCustomName("")
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
    <main className="flex flex-col items-center min-h-screen px-4 gap-12">
      <div className="flex items-center justify-between w-full px-6 py-4">
        <div className="flex items-center gap-10">
          <img src="/dtu.png" alt="DTU Logo" className="w-20 h-auto rounded-full" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm underline text-gray-600 hover:text-red-500"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-3 items-center">
        <input
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Custom Link Name"
          className="bg-slate-200 w-70 px-4 py-2 rounded-full shadow-xl focus:outline-none"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="shadow-md text-zinc font-semibold px-6 py-2 rounded-full hover:bg-slate-300 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Link"}
        </button>
      </div>

      {shareTokens.length > 0 && (
        <div className="w-full max-w-3xl mt-6 overflow-x-auto">
          <table className="min-w-full shadow-md rounded-lg overflow-hidden">
            <thead className="shadow-xl">
              <tr>
                <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Share Link</th>
                <th className="text-left px-4 py-2 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shareTokens.map((entry, idx) => {
                const link = `${window.location.origin}/share/${entry.token}`;
                return (
                  <tr key={idx} className="border-t hover:bg-gray-300">
                    <td className="px-4 py-1 w-[70%] font-medium underlined text-blue-500">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {entry.name}
                      </a>
                    </td>
                    <td className="px-4 py-1 flex w-[30%] sm:flex-row gap-2">
                      <button
                        onClick={() => setShareTokens(prev => prev.filter((_, i) => i !== idx))}
                        className="text-red-500 text-sm px-6 py-1 rounded-full hover:bg-red-100"
                      >
                        🗑️ Delete
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(link);
                          setCopiedIndex(idx);
                          setTimeout(() => setCopiedIndex(null), 2000);
                        }}
                        className={`text-sm px-6 py-1 rounded-full transition ${
                          copiedIndex === idx
                            ? 'bg-green-200 text-green-700'
                            : 'text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {copiedIndex === idx ? 'Copied!' : '📋 Copy'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}


      {error && <p className="text-red-500 text-sm">{error}</p>}
    </main>
  )
}

