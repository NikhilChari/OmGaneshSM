import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

function ProtectedRoute() {
  const {
    loading,
    isAuthenticated,
  } = useAuth()

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf0] px-4">
        <div className="rounded-2xl border border-[#9a3412]/10 bg-white px-8 py-6 shadow-sm">
          <p className="text-sm font-medium text-[#6b554b]">
            Checking authentication...
          </p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute