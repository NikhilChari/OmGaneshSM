function MissionVisionSection() {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            What Guides Us
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Our Mission &amp; Vision
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            Placeholder content for the principles and aspirations that guide
            the Mandal and its community activities.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article className="rounded-3xl border border-[#9a3412]/10 bg-white p-7 shadow-sm sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">
              What We Do
            </p>

            <h3 className="mt-3 text-2xl font-bold text-[#3f1d1d] sm:text-3xl">
              Our Mission
            </h3>

            <p className="mt-5 text-base leading-7 text-[#5c4a42]">
              Placeholder for the Mandal&apos;s mission, including its role in
              bringing people together through culture, community and shared
              traditions.
            </p>
          </article>

          <article className="rounded-3xl border border-[#9a3412]/10 bg-[#4a1f1f] p-7 text-white shadow-sm sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24]">
              Where We&apos;re Going
            </p>

            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Our Vision
            </h3>

            <p className="mt-5 text-base leading-7 text-white/80">
              Placeholder for the Mandal&apos;s long-term vision and its hopes
              for preserving culture, strengthening community and connecting
              future generations.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default MissionVisionSection