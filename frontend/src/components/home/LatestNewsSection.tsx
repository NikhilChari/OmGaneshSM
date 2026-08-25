import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'
import type { News } from '@/lib/api'

function LatestNewsSection() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true)
        setError('')

        const result = await api.getNews()

        setNews(result.news.slice(0, 3))
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load latest news.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Stay Connected
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Latest News
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5c4a42]">
              Keep up with announcements, community updates and cultural
              stories from the Mandal.
            </p>
          </div>

          <Link
            to="/news"
            className="text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
          >
            View Updates →
          </Link>
        </div>

        {loading && (
          <div className="mt-10 rounded-2xl border border-[#9a3412]/10 bg-white p-6 text-sm text-[#5c4a42]">
            Loading latest news...
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#9a3412]/10 bg-white p-6 text-sm text-[#5c4a42]">
            No news updates available yet.
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.id ?? item.slug}
                className="group rounded-2xl border border-[#9a3412]/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9a3412]">
                    {item.status || 'News'}
                  </span>

                  <span className="text-xs text-[#6b554b]">
                    {item.published_at
                      ? new Date(item.published_at).toLocaleDateString()
                      : 'Recently'}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#3f1d1d]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                  {item.excerpt ||
                    item.content.slice(0, 150) +
                      (item.content.length > 150 ? '...' : '')}
                </p>

                <div className="mt-6 border-t border-[#9a3412]/10 pt-4">
                  <Link
                    to={`/news/${item.slug}`}
                    className="text-sm font-semibold text-[#9a3412] transition-colors group-hover:text-[#7f1d1d]"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default LatestNewsSection