function MembershipHero() {
  return (
    <section className="bg-[#fffaf0]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Membership
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-[#3f1d1d] sm:text-5xl lg:text-6xl">
              Be Part of Our
              <span className="block">Community</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#5c4a42] sm:text-lg sm:leading-8">
              Become part of a community that celebrates culture, encourages
              participation and keeps traditions connected across generations.
            </p>

            <a
              href="#membership-application"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d97706] px-7 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#b45309] hover:shadow-md"
            >
              Become a Member
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm">
            <div className="flex aspect-4/3 items-center justify-center bg-gradient-to-br from-[#f5ead5] via-[#fff7ed] to-[#ead8bd]">
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                <p className="mt-5 text-sm font-semibold text-[#4a1f1f]">
                  Membership Image Placeholder
                </p>

                <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                  Replace with an authentic Mandal community photograph.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MembershipHero