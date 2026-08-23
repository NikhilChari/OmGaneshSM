import { Link } from 'react-router-dom'

function AboutHero() {
  return (
    <section className="overflow-hidden bg-[#fffaf0]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-20">
        {/* Content */}
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            About the Mandal
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-[#3f1d1d] sm:text-5xl lg:text-6xl">
            Our Story &amp; Community
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#5c4a42] sm:text-lg sm:leading-8">
            Om Ganesh Sanskrutik Mandal is a community-focused organization
            built around culture, togetherness and shared traditions. This
            space introduces who we are and the values that bring our
            community together.
          </p>

          <div className="mt-8">
            <Link
              to="#our-story"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d97706] px-7 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#b45309] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:ring-offset-2"
            >
              Explore Our Story
            </Link>
          </div>
        </div>

        {/* Neutral image placeholder */}
        <div
          className="relative overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-[#f5ead5] shadow-sm"
          aria-label="Placeholder for an authentic Mandal photograph"
        >
          <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-[#f5ead5] via-[#fff7ed] to-[#ead8bd]">
            <div className="px-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4a1f1f] text-[#fbbf24]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="8.5" cy="9" r="1.5" />
                  <path d="m4 17 5-5 4 4 2.5-2.5L20 17" />
                </svg>
              </div>

              <p className="mt-5 text-sm font-semibold text-[#4a1f1f]">
                Authentic Mandal Photograph
              </p>

              <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                Placeholder — replace with an official cultural or community
                photograph when available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero