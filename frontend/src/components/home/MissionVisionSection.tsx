function MissionVisionSection() {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Mission */}
          <article className="rounded-3xl border border-[#9a3412]/10 bg-white p-7 shadow-sm sm:p-9 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#9a3412]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M12 3v18M3 12h18" />
                <circle cx="12" cy="12" r="8" />
              </svg>
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d]">
              Our Mission
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5c4a42]">
              To bring people together through culture, community activities
              and shared traditions while creating opportunities for people to
              participate, connect and contribute.
            </p>
          </article>

          {/* Vision */}
          <article className="rounded-3xl border border-[#9a3412]/10 bg-[#4a1f1f] p-7 text-white shadow-sm sm:p-9 lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#fbbf24]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.5" />
              </svg>
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24]">
              Where We&apos;re Going
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Our Vision
            </h2>

            <p className="mt-5 text-base leading-7 text-white/80">
              To build a welcoming and connected community where culture,
              traditions and shared experiences continue to bring generations
              together.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default MissionVisionSection