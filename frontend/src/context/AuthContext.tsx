import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import {
  api,
  type AdminProfile,
} from '@/lib/api'

interface AuthContextValue {
  admin: AdminProfile | null
  loading: boolean
  isAuthenticated: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<void>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  )

const TOKEN_KEY =
  'omganesh_admin_token'

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [admin, setAdmin] =
    useState<AdminProfile | null>(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function restoreSession() {
      const token =
        localStorage.getItem(TOKEN_KEY)

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const result =
          await api.getMyProfile()

        setAdmin(result.admin)
      } catch {
        localStorage.removeItem(
          TOKEN_KEY,
        )

        setAdmin(null)
      } finally {
        setLoading(false)
      }
    }

    restoreSession()
  }, [])

  async function login(
    email: string,
    password: string,
  ) {
    const result =
      await api.login({
        email,
        password,
      })

    localStorage.setItem(
      TOKEN_KEY,
      result.token,
    )

    setAdmin(result.admin)
  }

  function logout() {
    localStorage.removeItem(
      TOKEN_KEY,
    )

    setAdmin(null)
  }

  async function refreshProfile() {
    const result =
      await api.getMyProfile()

    setAdmin(result.admin)
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        isAuthenticated:
          Boolean(admin),
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context =
    useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider.',
    )
  }

  return context
}