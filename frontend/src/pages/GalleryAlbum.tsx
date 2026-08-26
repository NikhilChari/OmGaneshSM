import {
  useEffect,
  useState,
} from 'react'
import {
  Link,
  useParams,
} from 'react-router-dom'

import type {
  GalleryAlbum as GalleryAlbumData,
  GalleryImage,
} from '@/lib/api'

import { api } from '@/lib/api'

function GalleryAlbumPage() {
  const { slug } =
    useParams<{ slug: string }>()

  const [album, setAlbum] =
    useState<GalleryAlbumData | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null)

  useEffect(() => {
    let active = true

    async function loadAlbum() {
      if (!slug) {
        if (active) {
          setError(
            'Gallery album not found.',
          )
          setLoading(false)
        }

        return
      }

      setLoading(true)
      setError('')
      setAlbum(null)
      setSelectedIndex(null)

      try {
        const result =
          await api.getGalleryAlbum(slug)

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

  const images =
    album?.images ?? []

  function closeLightbox() {
    setSelectedIndex(null)
  }

  function showPrevious() {
    if (
      selectedIndex === null ||
      images.length === 0
    ) {
      return
    }

    setSelectedIndex(
      selectedIndex === 0
        ? images.length - 1
        : selectedIndex - 1,
    )
  }

  function showNext() {
    if (
      selectedIndex === null ||
      images.length === 0
    ) {
      return
    }

    setSelectedIndex(
      selectedIndex === images.length - 1
        ? 0
        : selectedIndex + 1,
    )
  }

  useEffect(() => {
    if (selectedIndex === null) {
      return
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === 'Escape') {
        closeLightbox()
        return
      }

      if (event.key === 'ArrowLeft') {
        showPrevious()
        return
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    )

    const previousOverflow =
      document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      )

      document.body.style.overflow =
        previousOverflow
    }
  }, [selectedIndex, images.length])

  if (loading) {
    return (
      <main className="bg-[#fffaf0] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#9a3412]/10 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-[#6b554b]">
              Loading gallery...
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !album) {
    return (
      <main className="bg-[#fffaf0] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-red-700">
              {error ||
                'Gallery album not found.'}
            </p>

            <Link
              to="/gallery"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#9a3412] hover:text-[#7f1d1d]"
            >
              <span aria-hidden="true">
                ←
              </span>
              Back to Gallery
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#fffaf0]">
      <section className="border-b border-[#9a3412]/10 bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
          >
            <span aria-hidden="true">
              ←
            </span>
            Back to Gallery
          </Link>

          <div className="mt-8 max-w-3xl">
            {album.status && (
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
                {album.status}
              </p>
            )}

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3f1d1d] sm:text-5xl">
              {album.title}
            </h1>

            {album.description && (
              <p className="mt-5 text-base leading-7 text-[#5c4a42] sm:text-lg">
                {album.description}
              </p>
            )}

            <p className="mt-4 text-sm font-medium text-[#8a7469]">
              {images.length === 1
                ? '1 photo'
                : `${images.length} photos`}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {images.length === 0 ? (
            <EmptyGallery />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {images.map(
                (
                  image,
                  index,
                ) => (
                  <GalleryImageCard
                    key={
                      image.id ??
                      `${image.image_url}-${index}`
                    }
                    image={image}
                    index={index}
                    onOpen={() =>
                      setSelectedIndex(
                        index,
                      )
                    }
                  />
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {selectedIndex !== null &&
        images[selectedIndex] && (
          <GalleryLightbox
            images={images}
            selectedIndex={
              selectedIndex
            }
            onClose={
              closeLightbox
            }
            onPrevious={
              showPrevious
            }
            onNext={showNext}
          />
        )}
    </main>
  )
}

function GalleryImageCard({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage
  index: number
  onOpen: () => void
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#9a3412]/20"
        aria-label={`Open photo ${index + 1}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f5ead5]">
          <img
            src={image.image_url}
            alt={
              image.caption ||
              `Gallery photo ${index + 1}`
            }
            loading={
              index < 3
                ? 'eager'
                : 'lazy'
            }
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f1d1d]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#4a1f1f] shadow-sm backdrop-blur-sm">
            {String(
              index + 1,
            ).padStart(2, '0')}
          </span>

          <span className="absolute bottom-4 left-4 rounded-full bg-[#3f1d1d]/80 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            View photo
          </span>
        </div>
      </button>

      {image.caption && (
        <div className="p-5">
          <p className="text-sm leading-6 text-[#5c4a42]">
            {image.caption}
          </p>
        </div>
      )}
    </article>
  )
}

function EmptyGallery() {
  return (
    <div className="rounded-3xl border border-[#9a3412]/10 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#9a3412]">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
          />
          <circle
            cx="8.5"
            cy="10"
            r="1.5"
          />
          <path d="m4 17 5-5 3.5 3 2.5-2.5L20 17" />
        </svg>
      </div>

      <h2 className="mt-5 text-xl font-bold text-[#3f1d1d]">
        No photos yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6b554b]">
        Photos for this album will
        appear here once they are
        uploaded.
      </p>
    </div>
  )
}

function GalleryLightbox({
  images,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  images: GalleryImage[]
  selectedIndex: number
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  const image =
    images[selectedIndex]

  if (!image) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery photo viewer"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose()
        }
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
        aria-label="Close photo viewer"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrevious}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            aria-label="Previous photo"
          >
            ←
          </button>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            aria-label="Next photo"
          >
            →
          </button>
        </>
      )}

      <div className="flex max-h-full max-w-6xl flex-col items-center">
        <div className="flex max-h-[75vh] items-center justify-center">
          <img
            src={image.image_url}
            alt={
              image.caption ||
              `Gallery photo ${selectedIndex + 1}`
            }
            className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
          />
        </div>

        <div className="mt-4 max-w-2xl text-center">
          <p className="text-sm font-semibold text-white">
            {selectedIndex + 1} /{' '}
            {images.length}
          </p>

          {image.caption && (
            <p className="mt-2 text-sm leading-6 text-white/80">
              {image.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default GalleryAlbumPage