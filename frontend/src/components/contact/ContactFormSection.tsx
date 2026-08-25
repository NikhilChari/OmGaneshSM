import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { api } from '@/lib/api'

function ContactFormSection() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    // Save the form element before the async API request.
    // event.currentTarget can become null after await.
    const formElement = event.currentTarget
    const form = new FormData(formElement)

    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const result = await api.submitContact({
        name: String(form.get('name') || ''),
        email: String(form.get('email') || ''),
        phone: String(form.get('phone') || ''),
        subject: String(form.get('subject') || ''),
        message: String(form.get('message') || ''),
      })

      setSuccess(result.message)

      // Reset the saved form element after successful submission.
      formElement.reset()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to send your message.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Send a Message
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              We&apos;d Love to Hear From You
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5c4a42]">
              Whether you have a question, feedback, membership enquiry or
              would like to know more about our activities, use the form to
              get in touch.
            </p>

            <div className="mt-8 rounded-2xl border border-[#9a3412]/10 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a3412]">
                Response Information
              </p>

              <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                We&apos;ll review your message and get back to you as soon as
                possible.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-sm font-semibold text-[#3f1d1d]"
                >
                  Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="mt-2 h-12 w-full rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 text-sm text-[#3f1d1d] outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-sm font-semibold text-[#3f1d1d]"
                >
                  Email
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 h-12 w-full rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 text-sm text-[#3f1d1d] outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-phone"
                className="text-sm font-semibold text-[#3f1d1d]"
              >
                Phone
                <span className="font-normal text-[#5c4a42]">
                  {' '}
                  (optional)
                </span>
              </label>

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="Your phone number"
                className="mt-2 h-12 w-full rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 text-sm text-[#3f1d1d] outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-subject"
                className="text-sm font-semibold text-[#3f1d1d]"
              >
                Subject
              </label>

              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="How can we help?"
                className="mt-2 h-12 w-full rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 text-sm text-[#3f1d1d] outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="contact-message"
                className="text-sm font-semibold text-[#3f1d1d]"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                placeholder="Write your message..."
                className="mt-2 w-full resize-y rounded-xl border border-[#9a3412]/15 bg-[#fffaf0] px-4 py-3 text-sm text-[#3f1d1d] outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/15"
              />
            </div>

            {success && (
              <p
                role="status"
                className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
              >
                {success}
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#d97706] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#b45309] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactFormSection