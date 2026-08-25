import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Event } from '@/lib/api'

function UpcomingEventsSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUpcomingEvents() {
      try {
        setLoading(true)
        setError('')

        const result = await api.getEvents()

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const upcoming = result.events
          .filter((event) => {
            const eventDate = new Date(event.event_date)
            eventDate.setHours(0, 0, 0, 0)

            return eventDate >= today
          })
          .sort(
            (a, b) =>
              new Date(a.event_date).getTime() -
              new Date(b.event_date).getTime(),
          )
          .slice(0, 3)

        setEvents(upcoming)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load upcoming events.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadUpcomingEvents()
  }, [])

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
          {loading && (
            <div className="rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-6 shadow-sm md:col-span-2 lg:col-span-3">
              <p className="text-sm text-[#5c4a42]">
                Loading upcoming events...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-6 shadow-sm md:col-span-2 lg:col-span-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-6 shadow-sm md:col-span-2 lg:col-span-3">
              <p className="text-sm text-[#5c4a42]">
                No upcoming events available yet.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            events.map((event) => (
              <article
                key={event.id ?? event.slug}
                className="overflow-hidden rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex aspect-video items-center justify-center bg-[#f5ead5]">
                  {event.image_url ? (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="rounded-full border border-[#9a3412]/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#9a3412]">
                      Image Coming Soon
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9a3412]">
                    Event
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-[#3f1d1d]">
                    {event.title}
                  </h3>

                  {event.description && (
                    <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                      {event.description}
                    </p>
                  )}

                  <div className="mt-5 border-t border-[#9a3412]/10 pt-4">
                    <p className="text-sm font-medium text-[#6b554b]">
                      {new Date(event.event_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>

                    {event.start_time && (
                      <p className="mt-1 text-sm text-[#6b554b]">
                        {event.start_time}
                        {event.end_time ? ` – ${event.end_time}` : ''}
                      </p>
                    )}

                    {event.location && (
                      <p className="mt-1 text-sm text-[#6b554b]">
                        {event.location}
                      </p>
                    )}
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