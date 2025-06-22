'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { refreshToken } from '@/lib/api'
import { isTokenExpired } from '@/lib/auth'

export function useAuth() {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    const access = localStorage.getItem('accessToken')
    const refresh = localStorage.getItem('refreshToken')

    if (!access || !refresh) {
      localStorage.clear()
      router.push('/admin/login')
      return
    }

    if (isTokenExpired(access)) {
      refreshToken(refresh)
        .then(({ accessToken: newToken }) => {
          localStorage.setItem('accessToken', newToken)
          setAccessToken(newToken)
        })
        .catch(() => {
          localStorage.clear()
          router.push('/admin/login')
        })
    } else {
      setAccessToken(access)
    }
  }, [router])

  return accessToken
}
