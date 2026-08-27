import {
  type FormEvent,
  useEffect,
  useState,
} from 'react'

import { Link } from 'react-router-dom'

import {
  api,
  type CreateNewsPayload,
  type News,
} from '@/lib/api'

interface NewsForm {
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  published_at: string
  status: 'draft' | 'published'
}

const emptyForm: NewsForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image_url: '',
  published_at: '',
  status: 'draft',
}

function AdminNews() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [form, setForm] =
    useState<NewsForm>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  async function loadNews() {
    setLoading(true)
    setError('')

    try {
      const result =
        await api.getAdminNews()

      setNews(result.news)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load news.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadNews()
  }, [])

  function updateField(
    field: keyof NewsForm,
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

  function editNews(item: News) {
    setEditingId(item.id ?? null)

    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt ?? '',
      content: item.content,
      image_url: item.image_url ?? '',
      published_at: item.published_at
        ? item.published_at.slice(0, 16)
        : '',
      status:
        item.status === 'published'
          ? 'published'
          : 'draft',
    })

    setMessage('')
    setError('')

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
    setMessage('')

    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }

    if (!form.slug.trim()) {
      setError('Slug is required.')
      return
    }

    if (!form.content.trim()) {
      setError('Content is required.')
      return
    }

    setSaving(true)

    try {
      const payload: CreateNewsPayload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt:
          form.excerpt.trim() || undefined,
        content: form.content.trim(),
        image_url:
          form.image_url.trim() || undefined,
        published_at:
          form.published_at || null,
        status: form.status,
      }

      if (editingId !== null) {
        await api.updateNews(
          editingId,
          payload,
        )

        setMessage(
          'News article updated successfully.',
        )
      } else {
        await api.createNews(payload)

        setMessage(
          'News article created successfully.',
        )
      }

      resetForm()
      await loadNews()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save news article.',
      )
    } finally {
      setSaving(false)
    }
  }

  async function deleteNews(
    item: News,
  ) {
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
      await api.deleteNews(item.id)

      setMessage(
        'News article deleted successfully.',
      )

      if (editingId === item.id) {
        resetForm()
      }

      await loadNews()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete news article.',
      )
    }
  }

  function generateSlug() {
    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    updateField('slug', slug)
  }

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Admin navigation */}
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
              className="rounded-xl bg-[#9a3412] px-4 py-2 text-sm font-semibold text-white"
            >
              News Management
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
            News Management
          </h1>

          <p className="mt-2 text-sm text-[#6b554b]">
            Create, edit, publish, and delete
            news articles.
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

        {/* Form */}
        <section className="mb-10 rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#3f1d1d]">
                {editingId !== null
                  ? 'Edit News Article'
                  : 'Create News Article'}
              </h2>

              <p className="mt-1 text-sm text-[#6b554b]">
                Add the information for your
                news article.
              </p>
            </div>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-[#9a3412]/20 px-4 py-2 text-sm font-semibold text-[#6b554b] hover:bg-[#fff7ed]"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="news-title"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Title
                </label>

                <input
                  id="news-title"
                  value={form.title}
                  onChange={(event) =>
                    updateField(
                      'title',
                      event.target.value,
                    )
                  }
                  placeholder="News article title"
                  disabled={saving}
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="news-slug"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Slug
                </label>

                <div className="mt-2 flex gap-2">
                  <input
                    id="news-slug"
                    value={form.slug}
                    onChange={(event) =>
                      updateField(
                        'slug',
                        event.target.value,
                      )
                    }
                    placeholder="news-article-slug"
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

            <div>
              <label
                htmlFor="news-excerpt"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Excerpt
              </label>

              <textarea
                id="news-excerpt"
                value={form.excerpt}
                onChange={(event) =>
                  updateField(
                    'excerpt',
                    event.target.value,
                  )
                }
                rows={3}
                placeholder="Short summary of the article"
                disabled={saving}
                className="mt-2 w-full rounded-xl border border-[#9a3412]/20 px-4 py-3 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div>
              <label
                htmlFor="news-content"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Content
              </label>

              <textarea
                id="news-content"
                value={form.content}
                onChange={(event) =>
                  updateField(
                    'content',
                    event.target.value,
                  )
                }
                rows={10}
                placeholder="Write the full news article..."
                disabled={saving}
                className="mt-2 w-full rounded-xl border border-[#9a3412]/20 px-4 py-3 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="news-image"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Image URL
                </label>

                <input
                  id="news-image"
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

              <div>
                <label
                  htmlFor="news-published-at"
                  className="block text-sm font-semibold text-[#3f1d1d]"
                >
                  Published At
                </label>

                <input
                  id="news-published-at"
                  type="datetime-local"
                  value={form.published_at}
                  onChange={(event) =>
                    updateField(
                      'published_at',
                      event.target.value,
                    )
                  }
                  disabled={saving}
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#9a3412]/20 px-4 text-sm outline-none focus:border-[#9a3412] focus:ring-2 focus:ring-[#9a3412]/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="news-status"
                className="block text-sm font-semibold text-[#3f1d1d]"
              >
                Status
              </label>

              <select
                id="news-status"
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
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-11 rounded-xl bg-[#9a3412] px-6 text-sm font-semibold text-white transition hover:bg-[#7f1d1d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? 'Saving...'
                : editingId !== null
                  ? 'Update News'
                  : 'Create News'}
            </button>
          </form>
        </section>

        {/* Existing news */}
        <section className="rounded-3xl border border-[#9a3412]/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#3f1d1d]">
              Existing News
            </h2>

            <p className="mt-1 text-sm text-[#6b554b]">
              Manage all news articles, including
              drafts.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-[#6b554b]">
              Loading news...
            </p>
          ) : news.length === 0 ? (
            <div className="rounded-2xl bg-[#fffaf0] p-6 text-center">
              <p className="font-semibold text-[#3f1d1d]">
                No news articles yet.
              </p>

              <p className="mt-1 text-sm text-[#6b554b]">
                Create your first news article
                above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#9a3412]/10 p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.status ||
                            'draft'}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-[#9a3412]">
                        /news/{item.slug}
                      </p>

                      {item.excerpt && (
                        <p className="mt-3 text-sm leading-6 text-[#6b554b]">
                          {item.excerpt}
                        </p>
                      )}

                      <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-6 text-[#6b554b]">
                        {item.content}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          editNews(item)
                        }
                        className="rounded-xl border border-[#9a3412]/20 px-4 py-2 text-sm font-semibold text-[#9a3412] hover:bg-[#fff7ed]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void deleteNews(item)
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

export default AdminNews