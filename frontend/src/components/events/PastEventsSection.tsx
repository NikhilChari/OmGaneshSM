const pastEvents = [
  {
    year: '[YEAR]',
    title: 'Past Cultural Program',
    description:
      'Placeholder for a previous cultural program or celebration.',
  },
  {
    year: '[YEAR]',
    title: 'Past Community Event',
    description:
      'Placeholder for a previous community activity or gathering.',
  },
  {
    year: '[YEAR]',
    title: 'Past Festival Celebration',
    description:
      'Placeholder for a previous festival or traditional celebration.',
  },
]

function PastEventsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            Memories
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Past Events
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            A growing archive of celebrations, programs and community moments.
          </p>
        </div>

        <div className="mt-10 divide-y divide-[#9a3412]/10 rounded-3xl border border-[#9a3412]/10 bg-[#fffaf0]">
          {pastEvents.map((event) => (
            <article
              key={`${event.year}-${event.title}`}
              className="grid gap-4 p-6 sm:grid-cols-[120px_1fr] sm:p-8"
            >
              <p className="text-sm font-bold tracking-[0.15em] text-[#9a3412]">
                {event.year}
              </p>

              <div>
                <h3 className="text-xl font-bold text-[#3f1d1d]">
                  {event.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PastEventsSection