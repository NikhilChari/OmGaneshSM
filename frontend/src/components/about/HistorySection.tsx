function HistorySection() {
  const milestones = [
    {
      year: '[YEAR]',
      title: 'The Beginning',
      description:
        'Placeholder for the story of how Om Ganesh Sanskrutik Mandal was established and the vision behind bringing the community together.',
    },
    {
      year: '[YEAR]',
      title: 'Growing Together',
      description:
        'Placeholder for an important period of growth, cultural activities, community participation or new initiatives.',
    },
    {
      year: '[YEAR]',
      title: 'A New Chapter',
      description:
        'Placeholder for a significant milestone, celebration, initiative or achievement in the Mandal’s journey.',
    },
    {
      year: '[YEAR]',
      title: 'Continuing the Journey',
      description:
        'Placeholder for the Mandal’s present-day activities and its continuing commitment to culture, community and tradition.',
    },
  ]

  return (
    <section
      id="our-story"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            Our Journey
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Our History
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            Every community has a story. This timeline will highlight the
            important moments that shaped the journey of Om Ganesh
            Sanskrutik Mandal.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Timeline line */}
          <div
            className="absolute left-4 top-0 h-full w-px bg-[#9a3412]/15 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-10 sm:space-y-14">
            {milestones.map((milestone, index) => (
              <article
                key={`${milestone.year}-${index}`}
                className="relative grid gap-4 pl-12 sm:grid-cols-2 sm:gap-10 sm:pl-0"
              >
                {/* Timeline marker */}
                <div
                  className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-[#d97706] sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden="true"
                />

                {/* Year */}
                <div
                  className={
                    index % 2 === 0
                      ? 'sm:pr-10 sm:text-right'
                      : 'sm:order-2 sm:pl-10'
                  }
                >
                  <p className="text-sm font-bold tracking-[0.15em] text-[#9a3412]">
                    {milestone.year}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-[#3f1d1d] sm:text-2xl">
                    {milestone.title}
                  </h3>
                </div>

                {/* Description */}
                <div
                  className={
                    index % 2 === 0
                      ? 'sm:pl-10'
                      : 'sm:order-1 sm:pr-10 sm:text-right'
                  }
                >
                  <div className="rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-5 shadow-sm sm:p-6">
                    <p className="text-sm leading-6 text-[#5c4a42] sm:text-base sm:leading-7">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistorySection