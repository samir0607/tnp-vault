'use client'
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  return (
    <main className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">T&P Vault</h1>
        <p className="text-gray-600">Welcome. Please go to <code>/admin/login</code> to begin.</p>
        <button 
        onClick={()=> router.push('/admin/login')}
        className="bg-red-800 text-white font-semibold px-6 py-2 rounded hover:bg-red-900 transition disabled:opacity-50"
        >
          Admin Login
        </button>
      </div>
    </main>
  );
}
