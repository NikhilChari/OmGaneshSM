import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { News } from '@/lib/api'
import { api } from '@/lib/api'

function NewsDetail() {
  const { slug } = useParams<{ slug: string }>()

  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadNews() {
      if (!slug) {
        if (active) {
          setError('News article not found.')
          setLoading(false)
        }

        return
      }

      setLoading(true)
      setError('')

      try {
        const result = await api.getNewsBySlug(slug)

        if (active) {
          setNews(result.news)
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load this news article.',
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadNews()

    return () => {
      active = false
    }
  }, [slug])

  function formatDate(date?: string | null) {
    if (!date) {
      return ''
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return date
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <main className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-medium text-[#6b554b]">
              Loading news article...
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !news) {
    return (
      <main className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              News
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              News Article Not Found
            </h1>

            <p className="mt-4 text-base leading-7 text-[#5c4a42]">
              {error || 'The requested news article could not be found.'}
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d97706] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article>
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
          >
            ← Back to Home
          </Link>

          <div className="mt-6 overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm">
            {news.image_url ? (
              <div className="aspect-video overflow-hidden bg-[#f5ead5]">
                <img
                  src={news.image_url}
                  alt={news.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9a3412]">
                  {news.status || 'News'}
                </span>

                {news.published_at && (
                  <span className="text-sm text-[#6b554b]">
                    {formatDate(news.published_at)}
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl lg:text-5xl">
                {news.title}
              </h1>

              {news.excerpt && (
                <p className="mt-5 text-lg leading-8 text-[#5c4a42]">
                  {news.excerpt}
                </p>
              )}

              <div className="mt-8 border-t border-[#9a3412]/10 pt-8">
                <div className="whitespace-pre-line text-base leading-8 text-[#5c4a42]">
                  {news.content}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

export default NewsDetail