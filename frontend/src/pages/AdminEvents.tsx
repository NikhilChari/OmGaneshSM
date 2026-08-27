import {
  type FormEvent,
  useEffect,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import {
  api,
  type Event,
} from '@/lib/api'

interface EventForm {
  title: string
  slug: string
  description: string
  event_date: string
  start_time: string
  end_time: string
  location: string
  image_url: string
  status: 'draft' | 'published' | 'cancelled'
}

interface CreateEventPayload {
  title: string
  slug: string
  description?: string
  event_date: string
  start_time?: string
  end_time?: string
  location?: string
  image_url?: string
  status: 'draft' | 'published' | 'cancelled'
}

const emptyForm: EventForm = {
  title: '',
  slug: '',
  description: '',
  event_date: '',
  start_time: '',
  end_time: '',
  location: '',
  image_url: '',
  status: 'draft',
}

function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [form, setForm] =
    useState<EventForm>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  async function loadEvents() {
    setLoading(true)
    setError('')

    try {
      const result = await api.getAdminEvents()

      setEvents(result.events)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load events.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadEvents()
  }, [])

  function updateField(
    field: keyof EventForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
  }

  function editEvent(item: Event) {
    if (!item.id) {
      return
    }

    setEditingId(item.id)

    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description ?? '',
      event_date: item.event_date ?? '',
      start_time:
        item.start_time?.slice(0, 5) ?? '',
      end_time:
        item.end_time?.slice(0, 5) ?? '',
      location: item.location ?? '',
      image_url: item.image_url ?? '',
      status:
        item.status === 'published'
          ? 'published'
          : item.status === 'cancelled'
            ? 'cancelled'
            : 'draft',
    })

    setMessage('')
    setError('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function generateSlug() {
    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    updateField('slug', slug)
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')
    setMessage('')

    if (!form.title.trim()) {
      setError('Event title is required.')
      return
    }

    if (!form.slug.trim()) {
      setError('Slug is required.')
      return
    }

    if (!form.event_date) {
      setError('Event date is required.')
      return
    }

    if (
      form.start_time &&
      form.end_time &&
      form.end_time < form.start_time
    ) {
      setError(
        'End time cannot be earlier than start time.',
      )
      return
    }

    setSaving(true)

    try {
      const payload: CreateEventPayload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description:
          form.description.trim() || undefined,
        event_date: form.event_date,
        start_time:
          form.start_time || undefined,
        end_time:
          form.end_time || undefined,
        location:
          form.location.trim() || undefined,
        image_url:
          form.image_url.trim() || undefined,
        status: form.status,
      }

      if (editingId !== null) {
        await api.updateEvent(
          editingId,
          payload,
        )

        setMessage(
          'Event updated successfully.',
        )
      } else {
        await api.createEvent(payload)

        setMessage(
          'Event created successfully.',
        )
      }

      resetForm()
      await loadEvents()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save event.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function deleteEvent(item: Event) {
    if (!item.id) {
      return
    }

    const confirmed = window.confirm(
      `Delete "${item.title}"?`,
    )

    if (!confirmed) {
      return
    }

    setError('')
    setMessage('')

    try {
      await api.deleteEvent(item.id)

      setMessage(
        'Event deleted successfully.',
      )

      if (editingId === item.id) {
        resetForm()
      }

      await loadEvents()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete event.',
      )
    }
  }

  function formatDate(date: string) {
    if (!date) {
      return ''
    }

    const parsed = new Date(
      `${date}T00:00:00`,
    )

    if (Number.isNaN(parsed.getTime())) {
      return date
    }

    return parsed.toLocaleDateString(
      undefined,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    )
  }

  function formatTime(time?: string | null) {
    if (!time) {
      return ''
    }

    const parts = time.split(':')
    const hours = Number(parts[0])
    const minutes = parts[1]

    if (
      Number.isNaN(hours) ||
      minutes === undefined
    ) {
      return time
    }

    const suffix = hours >= 12 ? 'PM' : 'AM'
    const displayHour =
      hours % 12 === 0 ? 12 : hours % 12

    return `${displayHour}:${minutes} ${suffix}`
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Admin Navigation */}
        <nav className="mb-8 rounded-2xl border border-[#9a3412]/10 bg-white p-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin/gallery"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] transition hover:bg-[#fff7ed] hover:text-[#9a3412]"
            >
              Gallery Management
            </Link>

            <Link
              to="/admin/team"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] transition hover:bg-[#fff7ed] hover:text-[#9a3412]"
            >
              Team Management
            </Link>

            <Link
              to="/admin/news"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] transition hover:bg-[#fff7ed] hover:text-[#9a3412]"
            >
              News Management
            </Link>

            <Link
              to="/admin/events"
              className="rounded-xl bg-[#9a3412] px-4 py-2 text-sm font-semibold text-white"
            >
              Event Management
            </Link>

            <Link
              to="/"
              className="ml-auto rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] transition hover:bg-[#f5f5f4]"
            >
              View Website
            </Link>
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">
            Admin
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#3f1d1d]">
            Event Management
          </h1>

          <p className="mt-2 text-sm text-[#6b554b]">
            Create, edit, publish, cancel, and
            delete events.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-700">
              {message}
            </p>
          </div>
        )}

        {/* Event Form */}
        <section className="mb-10 rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#3f1d1d]">
                {editingId !== null
                  ? 'Edit Event'
                  : 'Create Event'}
              </h2>

              <p className="mt-1 text-sm text-[#6b554b]">
                Add the information for your
                event.
              </p>
            </div>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-xl border border-[#9a3412]/20 px-4 py-2 text-sm font-semibold text-[#6b554b] hover:bg-[#fff7ed] disabled:opacity-50"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Title / Slug */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="event-title"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Event Title
                </label>

                <input
                  id="event-title"
                  value={form.title}
                  onChange={(event) =>
                    updateField(
                      'title',
                      event.target.value,
                    )
                  }
                  placeholder="Ganesh Chaturthi Celebration"
                  disabled={saving}
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="event-slug"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Slug
                </label>

                <div className="mt-2 flex gap-2">
                  <input
                    id="event-slug"
                    value={form.slug}
                    onChange={(event) =>
                      updateField(
                        'slug',
                        event.target.value,
                      )
                    }
                    placeholder="ganesh-chaturthi-celebration"
                    disabled={saving}
                    className="min-h-11 min-w-0 flex-1 rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                  />

                  <button
                    type="button"
                    onClick={generateSlug}
                    disabled={saving}
                    className="rounded-xl border border-[#9a3412]/20 px-3 text-xs font-semibold text-[#9a3412] hover:bg-[#fff7ed]"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="event-description"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Description
              </label>

              <textarea
                id="event-description"
                value={form.description}
                onChange={(event) =>
                  updateField(
                    'description',
                    event.target.value,
                  )
                }
                rows={6}
                placeholder="Describe the event..."
                disabled={saving}
                className="mt-2 w-full rounded-xl border border-[#9a3412]/20 px-4 py-3 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            {/* Date / Times */}
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label
                  htmlFor="event-date"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Event Date
                </label>

                <input
                  id="event-date"
                  type="date"
                  value={form.event_date}
                  onChange={(event) =>
                    updateField(
                      'event_date',
                      event.target.value,
                    )
                  }
                  disabled={saving}
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="event-start-time"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Start Time
                </label>

                <input
                  id="event-start-time"
                  type="time"
                  value={form.start_time}
                  onChange={(event) =>
                    updateField(
                      'start_time',
                      event.target.value,
                    )
                  }
                  disabled={saving}
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="event-end-time"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  End Time
                </label>

                <input
                  id="event-end-time"
                  type="time"
                  value={form.end_time}
                  onChange={(event) =>
                    updateField(
                      'end_time',
                      event.target.value,
                    )
                  }
                  disabled={saving}
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                />
              </div>
            </div>

            {/* Location / Image */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="event-location"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Location
                </label>

                <input
                  id="event-location"
                  value={form.location}
                  onChange={(event) =>
                    updateField(
                      'location',
                      event.target.value,
                    )
                  }
                  placeholder="Om Ganesh Sanskrutik Mandal"
                  disabled={saving}
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="event-image"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Image URL
                </label>

                <input
                  id="event-image"
                  type="url"
                  value={form.image_url}
                  onChange={(event) =>
                    updateField(
                      'image_url',
                      event.target.value,
                    )
                  }
                  placeholder="https://..."
                  disabled={saving}
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="event-status"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Status
              </label>

              <select
                id="event-status"
                value={form.status}
                onChange={(event) =>
                  updateField(
                    'status',
                    event.target.value,
                  )
                }
                disabled={saving}
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10 md:max-w-xs"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>

                <option value="cancelled">
                  Cancelled
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-11 rounded-xl bg-[#9a3412] px-6 text-sm font-semibold text-white transition hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? 'Saving...'
                : editingId !== null
                  ? 'Update Event'
                  : 'Create Event'}
            </button>
          </form>
        </section>

        {/* Existing Events */}
        <section className="rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#3f1d1d]">
              Existing Events
            </h2>

            <p className="mt-1 text-sm text-[#6b554b]">
              Manage all events, including drafts
              and cancelled events.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-[#6b554b]">
              Loading events...
            </p>
          ) : events.length === 0 ? (
            <div className="rounded-2xl bg-[#fffaf0] p-6 text-center">
              <p className="font-semibold text-[#3f1d1d]">
                No events yet.
              </p>

              <p className="mt-1 text-sm text-[#6b554b]">
                Create your first event above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#9a3412]/10 p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-[#3f1d1d]">
                          {item.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            item.status ===
                            'published'
                              ? 'bg-green-100 text-green-700'
                              : item.status ===
                                  'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.status ||
                            'draft'}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-[#9a3412]">
                        /events/{item.slug}
                      </p>

                      <div className="mt-4 grid gap-2 text-sm text-[#6b554b] sm:grid-cols-2">
                        <p>
                          <span className="font-semibold text-[#3f1d1d]">
                            Date:
                          </span>{' '}
                          {formatDate(
                            item.event_date,
                          )}
                        </p>

                        {(item.start_time ||
                          item.end_time) && (
                          <p>
                            <span className="font-semibold text-[#3f1d1d]">
                              Time:
                            </span>{' '}
                            {formatTime(
                              item.start_time,
                            )}
                            {item.start_time &&
                            item.end_time
                              ? ' - '
                              : ''}
                            {formatTime(
                              item.end_time,
                            )}
                          </p>
                        )}

                        {item.location && (
                          <p className="sm:col-span-2">
                            <span className="font-semibold text-[#3f1d1d]">
                              Location:
                            </span>{' '}
                            {item.location}
                          </p>
                        )}
                      </div>

                      {item.description && (
                        <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-6 text-[#6b554b]">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          editEvent(item)
                        }
                        className="rounded-xl border border-[#9a3412]/20 px-4 py-2 text-sm font-semibold text-[#9a3412] hover:bg-[#fff7ed]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void deleteEvent(item)
                        }
                        className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default AdminEvents