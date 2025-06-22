'use client'
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  return (
    <main className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">T&P Vault</h1>
        <p className="text-gray-600">Welcome. Please go to <code>/admin/login</code> to begin.</p>
        <button onClick={()=> router.push('/admin/login')}>Admin Login</button>
      </div>
    </main>
  );
}
