
function ConnectSection() {
  return (
    <section className="bg-[#4a1f1f] py-14 text-white sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24]">
  Stay Connected
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Stay Updated With Us
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/75">
        Receive occasional updates about upcoming events, cultural activities and
        community announcements.
        </p>

        <form
  onSubmit={(event) => event.preventDefault()}
  className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
>
  <label htmlFor="newsletter-email" className="sr-only">
    Email address
  </label>

  <input
    id="newsletter-email"
    type="email"
    placeholder="Enter your email address"
    className="min-h-12 flex-1 rounded-xl border border-[#9a3412]/15 bg-white px-4 text-sm text-[#3f1d1d] outline-none transition focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20"
  />

  <button
    type="submit"
    className="min-h-12 rounded-xl bg-[#d97706] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
  >
    Subscribe
  </button>
</form>

<div className="mt-8">
  <p className="text-sm font-medium text-white/75">
    Follow us on social media
  </p>

  <div className="mt-4 flex flex-wrap justify-center gap-3">
    <a
      href="https://www.instagram.com/om_ganesh_sanskrutik_mandal/"
      aria-label="Instagram"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-[#fbbf24]/40 hover:bg-white/10 hover:text-[#fbbf24]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      Instagram
    </a>

    <a
      href="#"
      aria-label="Facebook"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-[#fbbf24]/40 hover:bg-white/10 hover:text-[#fbbf24]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H8v3h2.6v8h2.9Z" />
      </svg>
      Facebook
    </a>

    <a
      href="#"
      aria-label="YouTube"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-[#fbbf24]/40 hover:bg-white/10 hover:text-[#fbbf24]"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9 2 12 2 12s0 3 .4 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.4-1.8.4-4.8.4-4.8s0-3-.4-4.8ZM10 15.3V8.7l5.2 3.3-5.2 3.3Z" />
      </svg>
      YouTube
    </a>
  </div>
</div>
      </div>
    </section>
  )
}

export default ConnectSection