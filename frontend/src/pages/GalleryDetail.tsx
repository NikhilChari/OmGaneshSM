import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { GalleryAlbum } from '@/lib/api'
import { api } from '@/lib/api'

function GalleryDetail() {
  const { slug } = useParams<{ slug: string }>()

  const [album, setAlbum] = useState<GalleryAlbum | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadAlbum() {
      if (!slug) {
        setError('Gallery album could not be found.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const result = await api.getGalleryAlbum(slug)

        if (active) {
          setAlbum(result.album)
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load gallery album.',
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadAlbum()

    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return (
      <section className="bg-[#fffaf0] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-[#6b554b]">
              Loading gallery album...
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !album) {
    return (
      <section className="bg-[#fffaf0] py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412]">
            Gallery
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Gallery Album Not Found
          </h1>

          <p className="mt-4 text-base leading-7 text-[#5c4a42]">
            {error || 'This gallery album is not available.'}
          </p>

          <Link
            to="/gallery"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d97706] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
          >
            Back to Gallery
          </Link>
        </div>
      </section>
    )
  }

  const images = album.images || []

  return (
    <section className="bg-[#fffaf0] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/gallery"
          className="inline-flex items-center text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
        >
          ? Back to Gallery
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            {album.status || 'Gallery'}
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-[#3f1d1d] sm:text-5xl">
            {album.title}
          </h1>

          {album.description && (
            <p className="mt-5 text-base leading-7 text-[#5c4a42] sm:text-lg sm:leading-8">
              {album.description}
            </p>
          )}
        </div>

        {album.cover_image_url && (
          <div className="mt-10 overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm">
            <img
              src={album.cover_image_url}
              alt={album.title}
              className="max-h-[560px] w-full object-cover"
            />
          </div>
        )}

        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a3412]">
                Memories
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#3f1d1d] sm:text-3xl">
                Moments from this Album
              </h2>
            </div>

            <span className="hidden text-sm font-medium text-[#6b554b] sm:block">
              {images.length} {images.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>

          {images.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm">
              <p className="text-sm font-medium text-[#6b554b]">
                Photos for this album will be added soon.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <article
                  key={image.id ?? `${image.image_url}-${index}`}
                  className="overflow-hidden rounded-2xl border border-[#9a3412]/10 bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#f5ead5]">
                    <img
                      src={image.image_url}
                      alt={
                        image.caption ||
                        `${album.title} photo ${index + 1}`
                      }
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </div>

                  {image.caption && (
                    <div className="p-4">
                      <p className="text-sm leading-6 text-[#5c4a42]">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 border-t border-[#9a3412]/10 pt-8">
          <Link
            to="/gallery"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#9a3412]/20 px-6 text-sm font-semibold text-[#9a3412] transition-colors hover:bg-[#fff7ed]"
          >
            View All Gallery Albums
          </Link>
        </div>
      </div>
    </section>
  )
}

export default GalleryDetail
