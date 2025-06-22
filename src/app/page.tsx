'use client'
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  return (
    <main className="flex gap-10 flex-col md:flex-row items-center justify-center min-h-screen text-center px-4">
      <div>
        <img src="/dtu.png" alt="DTU Logo" className="w-50 h-auto md:w-80 lg:w-92 rounded-full"/>
      </div>
      <div>
        <h1 className="text-5xl font-bold mb-3">T&P Vault</h1>
        <p className="text-gray-600">
          To manage and generate secure share links, please proceed to<code>/admin/login</code> to authenticate and continue.
        </p>
        <button 
        onClick={()=> router.push('/admin/login')}
        className="outline text-zinc font-semibold px-6 py-2 my-6 rounded-full hover:bg-slate-300 transition disabled:opacity-50"
        >
          Admin Login
        </button>
      </div>
    </main>
  );
}
