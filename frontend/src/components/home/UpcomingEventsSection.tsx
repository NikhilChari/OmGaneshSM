import { Link } from 'react-router-dom'

const upcomingEvents = [
  {
    category: 'Cultural',
    title: 'Upcoming Cultural Event',
    description:
      'Event details will be announced soon. Stay connected with the Mandal for upcoming cultural activities.',
  },
  {
    category: 'Community',
    title: 'Community Gathering',
    description:
      'Information about upcoming community activities will be shared here when available.',
  },
  {
    category: 'Celebration',
    title: 'Festival & Celebration',
    description:
      'Details about upcoming celebrations will be published here as events are announced.',
  },
]

function UpcomingEventsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              What&apos;s Happening
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Upcoming Events
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5c4a42]">
              Discover upcoming cultural celebrations and community activities
              organized by the Mandal.
            </p>
          </div>

          <Link
            to="/events"
            className="text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
          >
            View All Events →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article
              key={event.title}
              className="overflow-hidden rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex aspect-[16/9] items-center justify-center bg-[#f5ead5]">
                <span className="rounded-full border border-[#9a3412]/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#9a3412]">
                  Image Coming Soon
                </span>
              </div>

              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9a3412]">
                  {event.category}
                </span>

                <h3 className="mt-2 text-xl font-bold text-[#3f1d1d]">
                  {event.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                  {event.description}
                </p>

                <div className="mt-5 border-t border-[#9a3412]/10 pt-4">
                  <p className="text-sm font-medium text-[#6b554b]">
                    Date &amp; details coming soon
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UpcomingEventsSection