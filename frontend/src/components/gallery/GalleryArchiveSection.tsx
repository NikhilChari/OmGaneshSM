const archiveYears = [
  {
    year: '[YEAR]',
    title: 'Festival & Cultural Celebrations',
    description:
      'Placeholder archive for photographs and memories from this year.',
  },
  {
    year: '[YEAR]',
    title: 'Community Programs',
    description:
      'Placeholder archive for community activities and special programs.',
  },
  {
    year: '[YEAR]',
    title: 'Events & Gatherings',
    description:
      'Placeholder archive for events, gatherings and celebrations.',
  },
]

function GalleryArchiveSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Archive
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Memories Through the Years
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5c4a42]">
              Our gallery can grow into an archive of the Mandal&apos;s
              celebrations, activities and community memories over time.
            </p>
          </div>

          <div className="space-y-4">
            {archiveYears.map((item) => (
              <article
                key={item.year}
                className="rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-6 transition-shadow hover:shadow-sm sm:p-7"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a3412]">
                      {item.year}
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-[#3f1d1d]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg border border-[#9a3412]/20 px-4 text-sm font-semibold text-[#9a3412] transition-colors hover:bg-[#fff7ed]"
                  >
                    View Archive
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryArchiveSection