function EventsHero() {
  return (
    <section className="bg-[#fffaf0]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Events &amp; Celebrations
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-[#3f1d1d] sm:text-5xl lg:text-6xl">
              Bringing Our Community Together
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#5c4a42] sm:text-lg sm:leading-8">
              Discover upcoming celebrations, cultural programs and community
              activities organized by Om Ganesh Sanskrutik Mandal.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm">
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#f5ead5] via-[#fff7ed] to-[#ead8bd]">
              <div className="px-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4a1f1f] text-[#fbbf24]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                    <path d="M8 14h3M13 14h3M8 17h3" />
                  </svg>
                </div>

                <p className="mt-5 text-sm font-semibold text-[#4a1f1f]">
                  Events Image Placeholder
                </p>

                <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                  Replace with an authentic Mandal event photograph.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsHero