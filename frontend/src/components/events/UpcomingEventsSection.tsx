import { Link } from 'react-router-dom'

const upcomingEvents = [
  {
    date: '[DATE]',
    category: 'Cultural',
    title: 'Upcoming Cultural Celebration',
    description:
      'Placeholder for an upcoming cultural event organized by the Mandal.',
    location: '[LOCATION]',
    time: '[TIME]',
  },
  {
    date: '[DATE]',
    category: 'Community',
    title: 'Community Gathering',
    description:
      'Placeholder for a community gathering or activity.',
    location: '[LOCATION]',
    time: '[TIME]',
  },
  {
    date: '[DATE]',
    category: 'Festival',
    title: 'Festival Celebration',
    description:
      'Placeholder for an upcoming festival or traditional celebration.',
    location: '[LOCATION]',
    time: '[TIME]',
  },
]

function UpcomingEventsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Coming Up
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Upcoming Events
            </h2>

            <p className="mt-4 text-base leading-7 text-[#5c4a42]">
              Explore upcoming celebrations, programs and community activities.
            </p>
          </div>

          <Link
            to="/contact"
            className="text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7c2d12]"
          >
            Have an event to share? →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article
              key={event.title}
              className="group overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-[#fffaf0] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-[#f5ead5] to-[#fff7ed]">
                <span className="rounded-full bg-[#4a1f1f] px-4 py-2 text-xs font-semibold text-[#fbbf24]">
                  Event Image
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#9a3412]">
                    {event.category}
                  </span>

                  <span className="text-xs font-semibold text-[#5c4a42]">
                    {event.date}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#3f1d1d]">
                  {event.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                  {event.description}
                </p>

                <div className="mt-5 space-y-2 text-sm text-[#5c4a42]">
                  <p>📍 {event.location}</p>
                  <p>◷ {event.time}</p>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex min-h-10 items-center rounded-lg border border-[#9a3412]/20 px-4 text-sm font-semibold text-[#9a3412] transition-colors hover:bg-[#fff7ed]"
                >
                  Event Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEventsSection