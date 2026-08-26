import {
  type FormEvent,
  useEffect,
  useState,
} from 'react'

import { api } from '@/lib/api'

import type {
  GalleryAlbum,
} from '@/lib/api'

interface AlbumForm {
  title: string
  slug: string
  description: string
  cover_image_url: string
  status: 'draft' | 'published'
}

const emptyForm: AlbumForm = {
  title: '',
  slug: '',
  description: '',
  cover_image_url: '',
  status: 'published',
}

function AdminGallery() {
  const [albums, setAlbums] =
    useState<GalleryAlbum[]>([])

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  const [form, setForm] =
    useState<AlbumForm>(emptyForm)

  const [editingAlbumId, setEditingAlbumId] =
    useState<number | null>(null)

  async function loadAlbums() {
    setLoading(true)
    setError('')

    try {
      const result =
        await api.getAdminGalleryAlbums()

      setAlbums(result.albums)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load gallery albums.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAlbums()
  }, [])

  function updateForm(
    field: keyof AlbumForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function startCreate() {
    setEditingAlbumId(null)
    setForm(emptyForm)
    setError('')
    setSuccess('')
  }

  function startEdit(
    album: GalleryAlbum,
  ) {
    setEditingAlbumId(
      album.id ?? null,
    )

    setForm({
      title: album.title,
      slug: album.slug,
      description:
        album.description || '',
      cover_image_url:
        album.cover_image_url || '',
      status:
        album.status === 'draft'
          ? 'draft'
          : 'published',
    })

    setError('')
    setSuccess('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!form.title.trim()) {
      setError(
        'Album title is required.',
      )
      return
    }

    if (!form.slug.trim()) {
      setError(
        'Album slug is required.',
      )
      return
    }

    setSaving(true)

    try {
      if (editingAlbumId) {
        await api.updateGalleryAlbum(
          editingAlbumId,
          {
            title: form.title.trim(),
            slug: form.slug.trim(),
            description:
              form.description.trim(),
            cover_image_url:
              form.cover_image_url.trim(),
            status: form.status,
          },
        )

        setSuccess(
          'Gallery album updated successfully.',
        )
      } else {
        await api.createGalleryAlbum({
          title: form.title.trim(),
          slug: form.slug.trim(),
          description:
            form.description.trim(),
          cover_image_url:
            form.cover_image_url.trim(),
          status: form.status,
        })

        setSuccess(
          'Gallery album created successfully.',
        )
      }

      setForm(emptyForm)
      setEditingAlbumId(null)

      await loadAlbums()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save gallery album.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(
    album: GalleryAlbum,
  ) {
    if (!album.id) {
      return
    }

    const confirmed =
      window.confirm(
        `Delete "${album.title}"? This will also delete its gallery images.`,
      )

    if (!confirmed) {
      return
    }

    setError('')
    setSuccess('')

    try {
      await api.deleteGalleryAlbum(
        album.id,
      )

      setSuccess(
        'Gallery album deleted successfully.',
      )

      if (
        editingAlbumId === album.id
      ) {
        startCreate()
      }

      await loadAlbums()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete gallery album.',
      )
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">
              Om Ganesh
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#3f1d1d]">
              Gallery Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b554b]">
              Create, edit, publish and manage
              your gallery albums.
            </p>
          </div>

          <button
            type="button"
            onClick={startCreate}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#9a3412] px-5 text-sm font-semibold text-white transition hover:bg-[#7f1d1d]"
          >
            + New Album
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
            <p className="text-sm font-medium text-green-700">
              {success}
            </p>
          </div>
        )}

        <section className="mt-8 rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#3f1d1d]">
                {editingAlbumId
                  ? 'Edit Album'
                  : 'Create Album'}
              </h2>

              <p className="mt-1 text-sm text-[#6b554b]">
                Album information
              </p>
            </div>

            {editingAlbumId && (
              <button
                type="button"
                onClick={startCreate}
                className="text-sm font-semibold text-[#9a3412] hover:text-[#7f1d1d]"
              >
                Cancel edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="album-title"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Title
              </label>

              <input
                id="album-title"
                value={form.title}
                onChange={(event) =>
                  updateForm(
                    'title',
                    event.target.value,
                  )
                }
                placeholder="Ganesh Chaturthi 2026"
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="album-slug"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Slug
              </label>

              <input
                id="album-slug"
                value={form.slug}
                onChange={(event) =>
                  updateForm(
                    'slug',
                    event.target.value,
                  )
                }
                placeholder="ganesh-chaturthi-2026"
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="album-description"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Description
              </label>

              <textarea
                id="album-description"
                value={form.description}
                onChange={(event) =>
                  updateForm(
                    'description',
                    event.target.value,
                  )
                }
                rows={4}
                placeholder="A collection of photographs..."
                className="mt-2 w-full rounded-xl border border-[#9a3412]/20 px-4 py-3 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="cover-image"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Cover Image URL
              </label>

              <input
                id="cover-image"
                value={
                  form.cover_image_url
                }
                onChange={(event) =>
                  updateForm(
                    'cover_image_url',
                    event.target.value,
                  )
                }
                placeholder="https://..."
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="album-status"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Status
              </label>

              <select
                id="album-status"
                value={form.status}
                onChange={(event) =>
                  updateForm(
                    'status',
                    event.target.value,
                  )
                }
                className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 bg-white px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              >
                <option value="published">
                  Published
                </option>

                <option value="draft">
                  Draft
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#9a3412] px-5 text-sm font-semibold text-white transition hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {saving
                  ? 'Saving...'
                  : editingAlbumId
                    ? 'Update Album'
                    : 'Create Album'}
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#3f1d1d]">
                Existing Albums
              </h2>

              <p className="mt-1 text-sm text-[#6b554b]">
                {albums.length}{' '}
                {albums.length === 1
                  ? 'album'
                  : 'albums'}
              </p>
            </div>

            <button
              type="button"
              onClick={loadAlbums}
              disabled={loading}
              className="text-sm font-semibold text-[#9a3412] hover:text-[#7f1d1d] disabled:opacity-50"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="mt-5 rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm">
              <p className="text-sm text-[#6b554b]">
                Loading albums...
              </p>
            </div>
          ) : albums.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-dashed border-[#9a3412]/20 bg-white p-10 text-center">
              <h3 className="font-semibold text-[#3f1d1d]">
                No albums yet
              </h3>

              <p className="mt-2 text-sm text-[#6b554b]">
                Create your first gallery album
                above.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {albums.map((album) => (
                <article
                  key={album.id}
                  className="overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm"
                >
                  <div className="aspect-[16/9] bg-[#f5eadb]">
                    {album.cover_image_url ? (
                      <img
                        src={
                          album.cover_image_url
                        }
                        alt={album.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#6b554b]">
                        No cover image
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-[#3f1d1d]">
                        {album.title}
                      </h3>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          album.status ===
                          'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {album.status ||
                          'published'}
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-[#6b554b]">
                      /gallery/{album.slug}
                    </p>

                    {album.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6b554b]">
                        {album.description}
                      </p>
                    )}

                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          startEdit(album)
                        }
                        className="rounded-xl border border-[#9a3412]/20 px-3 py-2 text-sm font-semibold text-[#9a3412] hover:bg-[#fff7ed]"
                      >
                        Edit
                      </button>

                      <a
                        href={`/gallery/${album.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-[#9a3412]/20 px-3 py-2 text-sm font-semibold text-[#3f1d1d] hover:bg-[#fff7ed]"
                      >
                        View
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(album)
                        }
                        className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
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

export default AdminGallery