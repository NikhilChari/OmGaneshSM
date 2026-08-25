import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'

function MembershipApplicationSection() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    // Save the actual form element before the async request.
    // React's currentTarget can become null after an await.
    const formElement = event.currentTarget
    const form = new FormData(formElement)

    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const result = await api.submitMembership({
        full_name: String(form.get('full_name') || ''),
        email: String(form.get('email') || ''),
        phone: String(form.get('phone') || ''),
        address: String(form.get('address') || ''),
        message: String(form.get('message') || ''),
      })

      setSuccess(result.message)

      // Use the saved form element, not event.currentTarget.
      formElement.reset()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to submit your membership application.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="membership-application"
      className="bg-[#4a1f1f] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24] sm:text-sm">
            Membership Application
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Become a Member?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75">
            Fill in the form below to submit your membership application.
            We&apos;ll review your details and get in touch with you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-white p-6 text-[#3f1d1d] shadow-xl sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="membership-full-name"
                className="text-sm font-semibold"
              >
                Full Name
              </label>

              <input
                id="membership-full-name"
                name="full_name"
                type="text"
                required
                placeholder="Your full name"
                className="mt-2 h-12 w-full rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
              />
            </div>

            <div>
              <label
                htmlFor="membership-phone"
                className="text-sm font-semibold"
              >
                Phone
              </label>

              <input
                id="membership-phone"
                name="phone"
                type="tel"
                required
                placeholder="Your phone number"
                className="mt-2 h-12 w-full rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="membership-email"
              className="text-sm font-semibold"
            >
              Email
              <span className="font-normal text-[#5c4a42]"> (optional)</span>
            </label>

            <input
              id="membership-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 h-12 w-full rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 text-sm outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="membership-address"
              className="text-sm font-semibold"
            >
              Address
              <span className="font-normal text-[#5c4a42]"> (optional)</span>
            </label>

            <textarea
              id="membership-address"
              name="address"
              rows={3}
              placeholder="Your address"
              className="mt-2 w-full resize-y rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 py-3 text-sm outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="membership-message"
              className="text-sm font-semibold"
            >
              Message
              <span className="font-normal text-[#5c4a42]"> (optional)</span>
            </label>

            <textarea
              id="membership-message"
              name="message"
              rows={5}
              placeholder="Anything you would like us to know..."
              className="mt-2 w-full resize-y rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 py-3 text-sm outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
            />
          </div>

          {success && (
            <p className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {success}
            </p>
          )}

          {error && (
            <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#d97706] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#b45309] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Membership Application'}
          </button>
        </form>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact Us
          </Link>

          <Link
            to="/events"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MembershipApplicationSection