import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, type Event } from '@/lib/api'
import { eventImageApi } from '@/lib/eventImageApi'

interface EventForm {
  title: string
  slug: string
  description: string
  event_date: string
  start_time: string
  end_time: string
  location: string
  status: 'draft' | 'published' | 'cancelled'
}

const emptyForm: EventForm = {
  title: '', slug: '', description: '', event_date: '',
  start_time: '', end_time: '', location: '', status: 'draft',
}

function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [form, setForm] = useState<EventForm>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function loadEvents() {
    setLoading(true)
    try {
      const result = await api.getAdminEvents()
      setEvents(result.events)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load events.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadEvents() }, [])

  function updateField(field: keyof EventForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function resetForm() {
    setForm(emptyForm)
    setImageFile(null)
    setEditingId(null)
  }

  function editEvent(item: Event) {
    if (!item.id) return
    setEditingId(item.id)
    setImageFile(null)
    setForm({
      title: item.title,
      slug: item.slug,
      description: item.description ?? '',
      event_date: item.event_date ?? '',
      start_time: item.start_time?.slice(0, 5) ?? '',
      end_time: item.end_time?.slice(0, 5) ?? '',
      location: item.location ?? '',
      status: item.status === 'published' ? 'published' : item.status === 'cancelled' ? 'cancelled' : 'draft',
    })
    setError('')
    setMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function generateSlug() {
    updateField('slug', form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!form.title.trim() || !form.slug.trim() || !form.event_date) {
      setError('Title, slug and event date are required.')
      return
    }
    if (form.start_time && form.end_time && form.end_time < form.start_time) {
      setError('End time cannot be earlier than start time.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: form.description.trim() || undefined,
        event_date: form.event_date,
        start_time: form.start_time || undefined,
        end_time: form.end_time || undefined,
        location: form.location.trim() || undefined,
        status: form.status,
      }

      let eventId: number
      if (editingId !== null) {
        await api.updateEvent(editingId, payload)
        eventId = editingId
      } else {
        const result = await api.createEvent(payload)
        eventId = result.eventId
      }

      if (imageFile) {
        if (editingId !== null) await eventImageApi.replace(eventId, imageFile)
        else await eventImageApi.upload(eventId, imageFile)
      }

      setMessage(editingId !== null ? 'Event updated successfully.' : 'Event created successfully.')
      resetForm()
      await loadEvents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save event.')
    } finally {
      setSaving(false)
    }
  }

  async function deleteEvent(item: Event) {
    if (!item.id || !window.confirm(`Delete "${item.title}"?`)) return
    setError('')
    setMessage('')
    try {
      await api.deleteEvent(item.id)
      setMessage('Event deleted successfully.')
      if (editingId === item.id) resetForm()
      await loadEvents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete event.')
    }
  }

  function formatDate(date: string) {
    if (!date) return ''
    const parsed = new Date(`${date}T00:00:00`)
    return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  }

  function formatTime(time?: string | null) {
    if (!time) return ''
    const [h, m] = time.split(':')
    const hours = Number(h)
    if (Number.isNaN(hours) || !m) return time
    return `${hours % 12 || 12}:${m} ${hours >= 12 ? 'PM' : 'AM'}`
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 rounded-2xl border border-[#9a3412]/10 bg-white p-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/admin/gallery" className="rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] hover:bg-[#fff7ed]">Gallery Management</Link>
            <Link to="/admin/team" className="rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] hover:bg-[#fff7ed]">Team Management</Link>
            <Link to="/admin/news" className="rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] hover:bg-[#fff7ed]">News Management</Link>
            <Link to="/admin/events" className="rounded-xl bg-[#9a3412] px-4 py-2 text-sm font-semibold text-white">Event Management</Link>
            <Link to="/" className="ml-auto rounded-xl px-4 py-2 text-sm font-semibold text-[#6b554b] hover:bg-[#f5f5f4]">View Website</Link>
          </div>
        </nav>

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#3f1d1d]">Event Management</h1>
          <p className="mt-2 text-sm text-[#6b554b]">Create, edit, publish, cancel, delete events and upload event images.</p>
        </div>

        {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}
        {message && <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">{message}</div>}

        <section className="mb-10 rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div><h2 className="text-xl font-bold text-[#3f1d1d]">{editingId !== null ? 'Edit Event' : 'Create Event'}</h2><p className="mt-1 text-sm text-[#6b554b]">Add your event details and choose an image from your computer.</p></div>
            {editingId !== null && <button type="button" onClick={resetForm} disabled={saving} className="rounded-xl border border-[#9a3412]/20 px-4 py-2 text-sm font-semibold text-[#6b554b]">Cancel Edit</button>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div><label htmlFor="event-title" className="block text-sm font-semibold text-[#3f1d1d]">Event Title</label><input id="event-title" value={form.title} onChange={(e) => updateField('title', e.target.value)} disabled={saving} className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm" /></div>
              <div><label htmlFor="event-slug" className="block text-sm font-semibold text-[#3f1d1d]">Slug</label><div className="mt-2 flex gap-2"><input id="event-slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} disabled={saving} className="min-h-11 min-w-0 flex-1 rounded-xl border border-[#9a3412]/20 px-4 text-sm" /><button type="button" onClick={generateSlug} disabled={saving} className="rounded-xl border border-[#9a3412]/20 px-3 text-xs font-semibold text-[#9a3412]">Generate</button></div></div>
            </div>

            <div><label htmlFor="event-description" className="block text-sm font-semibold text-[#3f1d1d]">Description</label><textarea id="event-description" value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={5} disabled={saving} className="mt-2 w-full rounded-xl border border-[#9a3412]/20 px-4 py-3 text-sm" /></div>

            <div className="grid gap-5 md:grid-cols-3">
              <div><label htmlFor="event-date" className="block text-sm font-semibold text-[#3f1d1d]">Event Date</label><input id="event-date" type="date" value={form.event_date} onChange={(e) => updateField('event_date', e.target.value)} disabled={saving} className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm" /></div>
              <div><label htmlFor="event-start-time" className="block text-sm font-semibold text-[#3f1d1d]">Start Time</label><input id="event-start-time" type="time" value={form.start_time} onChange={(e) => updateField('start_time', e.target.value)} disabled={saving} className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm" /></div>
              <div><label htmlFor="event-end-time" className="block text-sm font-semibold text-[#3f1d1d]">End Time</label><input id="event-end-time" type="time" value={form.end_time} onChange={(e) => updateField('end_time', e.target.value)} disabled={saving} className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm" /></div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div><label htmlFor="event-location" className="block text-sm font-semibold text-[#3f1d1d]">Location</label><input id="event-location" value={form.location} onChange={(e) => updateField('location', e.target.value)} disabled={saving} className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm" /></div>
              <div><label htmlFor="event-image" className="block text-sm font-semibold text-[#3f1d1d]">Event Image</label><input id="event-image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} disabled={saving} className="mt-2 block min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-3 py-2 text-sm" /><p className="mt-1 text-xs text-[#6b554b]">JPEG, PNG, WebP or GIF · maximum 10 MB</p>{imageFile && <p className="mt-1 text-xs font-medium text-[#9a3412]">Selected: {imageFile.name}</p>}</div>
            </div>

            <div><label htmlFor="event-status" className="block text-sm font-semibold text-[#3f1d1d]">Status</label><select id="event-status" value={form.status} onChange={(e) => updateField('status', e.target.value)} disabled={saving} className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm md:max-w-xs"><option value="draft">Draft</option><option value="published">Published</option><option value="cancelled">Cancelled</option></select></div>
            <button type="submit" disabled={saving} className="inline-flex min-h-11 rounded-xl bg-[#9a3412] px-6 text-sm font-semibold text-white disabled:opacity-60">{saving ? 'Saving...' : editingId !== null ? 'Update Event' : 'Create Event'}</button>
          </form>
        </section>

        <section className="rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-[#3f1d1d]">Existing Events</h2>
          <p className="mt-1 text-sm text-[#6b554b]">Manage all events, including drafts and cancelled events.</p>
          {loading ? <p className="mt-6 text-sm text-[#6b554b]">Loading events...</p> : events.length === 0 ? <p className="mt-6 rounded-2xl bg-[#fffaf0] p-6 text-center text-sm text-[#6b554b]">No events yet.</p> : <div className="mt-6 space-y-4">{events.map((item) => <article key={item.id} className="rounded-2xl border border-[#9a3412]/10 p-5"><div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-bold text-[#3f1d1d]">{item.title}</h3><span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#9a3412]">{item.status || 'draft'}</span></div>{item.image_url && <img src={item.image_url} alt={item.title} className="mt-4 h-32 w-48 rounded-xl object-cover" />}<div className="mt-4 grid gap-2 text-sm text-[#6b554b] sm:grid-cols-2"><p><b>Date:</b> {formatDate(item.event_date)}</p><p><b>Time:</b> {formatTime(item.start_time)}{item.start_time && item.end_time ? ' – ' : ''}{formatTime(item.end_time)}</p><p><b>Location:</b> {item.location || '—'}</p></div></div><div className="flex shrink-0 gap-2"><button type="button" onClick={() => editEvent(item)} className="rounded-xl border border-[#9a3412]/20 px-4 py-2 text-sm font-semibold text-[#9a3412]">Edit</button><button type="button" onClick={() => void deleteEvent(item)} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white">Delete</button></div></div></article>)}</div>}
        </section>
      </div>
    </main>
  )
}

export default AdminEvents
