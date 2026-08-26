import {
  type FormEvent,
  useEffect,
  useState,
} from 'react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

function AdminLogin() {
  const {
    login,
    isAuthenticated,
    loading: authLoading,
  } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  useEffect(() => {
    if (
      !authLoading &&
      isAuthenticated
    ) {
      navigate(
        '/admin/gallery',
        { replace: true },
      )
    }
  }, [
    authLoading,
    isAuthenticated,
    navigate,
  ])

  if (
    authLoading ||
    isAuthenticated
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf0]">
        <p className="text-sm font-medium text-[#6b554b]">
          Loading...
        </p>
      </main>
    )
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')

    const trimmedEmail =
      email.trim().toLowerCase()

    if (
      !trimmedEmail ||
      !password
    ) {
      setError(
        'Email and password are required.',
      )

      return
    }

    setLoading(true)

    try {
      await login(
        trimmedEmail,
        password,
      )

      const from =
        (
          location.state as
            | {
                from?: string
              }
            | null
            | undefined
        )?.from

      navigate(
        from || '/admin/gallery',
        { replace: true },
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to sign in.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf0] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">
            Om Ganesh
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d]">
            Admin Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6b554b]">
            Sign in to manage the Om Ganesh
            website.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8"
        >
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          )}

          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-semibold text-[#3f1d1d]"
            >
              Email
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              placeholder="admin@example.com"
              disabled={loading}
              className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm text-[#3f1d1d] outline-none transition focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="admin-password"
              className="block text-sm font-semibold text-[#3f1d1d]"
            >
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              autoComplete="current-password"
              placeholder="Enter your password"
              disabled={loading}
              className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm text-[#3f1d1d] outline-none transition focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#9a3412] px-5 text-sm font-semibold text-white transition hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? 'Signing in...'
              : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default AdminLogin