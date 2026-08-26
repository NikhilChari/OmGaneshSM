import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { GalleryAlbum } from '@/lib/api'
import { api } from '@/lib/api'

function GalleryPlaceholder({
  title,
  category,
}: {
  title: string
  category: string
}) {
  return (
    <div className="relative flex h-full min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#f5ead5] via-[#fff7ed] to-[#ead8bd]">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#4a1f1f] text-[#fbbf24]">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path d="m4 17 5-5 3.5 3 2.5-2.5L20 17" />
          </svg>
        </div>

        <p className="mt-4 text-sm font-semibold text-[#4a1f1f]">
          {title}
        </p>

        <p className="mt-1 text-xs text-[#5c4a42]">{category}</p>
      </div>
    </div>
  )
}

function FeaturedGallerySection() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadGallery() {
      setLoading(true)
      setError('')

      try {
        const result = await api.getGallery()

        if (active) {
          setAlbums(result.albums.slice(0, 5))
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load gallery.',
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadGallery()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Featured Memories
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Moments Worth Remembering
            </h2>

            <p className="mt-4 text-base leading-7 text-[#5c4a42]">
              A visual collection that can grow with every celebration and
              community activity.
            </p>
          </div>

          <Link
            to="/gallery"
            className="text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
          >
                        View Gallery ?
          </Link>
        </div>

        {loading && (
          <div className="mt-10 rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-[#6b554b]">
              Loading gallery...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {!loading && !error && albums.length === 0 && (
          <div className="mt-10 rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-[#6b554b]">
              No gallery albums available yet.
            </p>
          </div>
        )}

        {!loading && !error && albums.length > 0 && (
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {albums.map((album, index) => (
              <article
                key={album.id ?? album.slug}
                className={`group overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                  index === 0 || index === 4
                    ? 'md:row-span-2 lg:col-span-2'
                    : ''
                }`}
              >
                <Link
                  to={`/gallery/${album.slug}`}
                  className="block h-full"
                >
                  <div className="relative h-full min-h-[260px]">
                    {album.cover_image_url ? (
                      <img
                        src={album.cover_image_url}
                        alt={album.title}
                        className="h-full min-h-[260px] w-full object-cover"
                      />
                    ) : (
                      <GalleryPlaceholder
                        title={album.title}
                        category={album.status || 'Gallery'}
                      />
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3f1d1d]/80 via-[#3f1d1d]/20 to-transparent p-5 pt-12">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#fbbf24]">
                        {album.status || 'Gallery'}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-white">
                        {album.title}
                      </h3>

                      {album.description && (
                        <p className="mt-1 line-clamp-2 text-sm text-white/80">
                          {album.description}
                        </p>
                      )}
                    </div>

                    <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#4a1f1f] shadow-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedGallerySection
