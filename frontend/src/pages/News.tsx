import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'
import type { News as NewsItem } from '@/lib/api'

function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true)
        setError('')

        const result = await api.getNews()
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

    loadNews()
  }, [])

  return (
    <main>
      <section className="bg-[#4a1f1f] py-16 text-white sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24] sm:text-sm">
            Stay Connected
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Latest News
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
            Keep up with announcements, community updates and cultural
            stories from the Mandal.
          </p>
        </div>
      </section>

      <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="rounded-2xl border border-[#9a3412]/10 bg-white p-8 text-center text-sm text-[#5c4a42]">
              Loading news...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className="rounded-2xl border border-[#9a3412]/10 bg-white p-8 text-center text-sm text-[#5c4a42]">
              No news updates available yet.
            </div>
          )}

          {!loading && !error && news.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <article
                  key={item.id ?? item.slug}
                  className="group rounded-2xl border border-[#9a3412]/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9a3412]">
                      {item.status || 'News'}
                    </span>

                    {item.published_at && (
                      <span className="text-xs text-[#6b554b]">
                        {new Date(item.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-[#3f1d1d]">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                    {item.excerpt || item.content}
                  </p>

                  <div className="mt-6 border-t border-[#9a3412]/10 pt-4">
                    <Link
                      to={`/news/${item.slug}`}
                      className="text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
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
    </main>
  )
}

export default News