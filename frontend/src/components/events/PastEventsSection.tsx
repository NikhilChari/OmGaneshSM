import { useEffect, useState } from 'react'
import { api, type Event } from '@/lib/api'

function PastEventsSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPastEvents() {
      try {
        setLoading(true)
        setError('')

        const result = await api.getEvents()

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const past = result.events
          .filter((event) => {
            const eventDate = new Date(event.event_date)
            eventDate.setHours(0, 0, 0, 0)

            return eventDate < today
          })
          .sort(
            (a, b) =>
              new Date(b.event_date).getTime() -
              new Date(a.event_date).getTime(),
          )

        setEvents(past)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load past events.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadPastEvents()
  }, [])

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
          {loading && (
            <div className="p-6 sm:p-8">
              <p className="text-sm text-[#5c4a42]">
                Loading past events...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="p-6 sm:p-8">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="p-6 sm:p-8">
              <p className="text-sm text-[#5c4a42]">
                No past events available yet.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            events.map((event) => (
              <article
                key={event.id ?? event.slug}
                className="grid gap-4 p-6 sm:grid-cols-[120px_1fr] sm:p-8"
              >
                <p className="text-sm font-bold tracking-[0.15em] text-[#9a3412]">
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                  })}
                </p>

                <div>
                  <h3 className="text-xl font-bold text-[#3f1d1d]">
                    {event.title}
                  </h3>

                  {event.description && (
                    <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                      {event.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  )
}

export default PastEventsSection