function NewsletterSection() {
  return (
    <section className="bg-[#4a1f1f] py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24] sm:text-sm">
          Stay Connected
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Keep in Touch With Us
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75">
          Stay informed about upcoming events, community activities and
          important announcements from the Mandal.
        </p>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            className="min-h-12 flex-1 rounded-xl border border-white/15 bg-white px-4 text-sm text-[#3f1d1d] outline-none placeholder:text-[#6b554b] focus:border-[#fbbf24] focus:ring-2 focus:ring-[#fbbf24]/30"
          />

          <button
            type="submit"
            className="min-h-12 rounded-xl bg-[#d97706] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#b45309] focus:outline-none focus:ring-2 focus:ring-[#fbbf24] focus:ring-offset-2 focus:ring-offset-[#4a1f1f]"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-4 text-xs text-white/50">
          Newsletter subscription will be connected when the backend is
          implemented.
        </p>
      </div>
    </section>
  )
}

export default NewsletterSection