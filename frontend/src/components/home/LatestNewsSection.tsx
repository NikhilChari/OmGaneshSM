import { Link } from 'react-router-dom'

const latestNews = [
  {
    category: 'Announcement',
    title: 'Latest News & Announcements',
    description:
      'Updates and announcements from the Mandal will appear here as they are published.',
  },
  {
    category: 'Community',
    title: 'Community Updates',
    description:
      'Stay connected with community activities, initiatives and important updates.',
  },
  {
    category: 'Cultural',
    title: 'Cultural Stories',
    description:
      'News and stories celebrating cultural activities and community experiences will be shared here.',
  },
]

function LatestNewsSection() {
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
            to="/events"
            className="text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
          >
            View Updates →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((news) => (
            <article
              key={news.title}
              className="group rounded-2xl border border-[#9a3412]/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9a3412]">
                  {news.category}
                </span>

                <span className="text-xs text-[#6b554b]">
                  Coming Soon
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#3f1d1d]">
                {news.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                {news.description}
              </p>

              <div className="mt-6 border-t border-[#9a3412]/10 pt-4">
                <span className="text-sm font-semibold text-[#9a3412] transition-colors group-hover:text-[#7f1d1d]">
                  Read More →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LatestNewsSection