import { Link } from 'react-router-dom'

const galleryItems = [
  {
    title: 'Cultural Celebrations',
    description: 'Moments from cultural programs and celebrations.',
  },
  {
    title: 'Community Activities',
    description: 'Snapshots of community participation and activities.',
  },
  {
    title: 'Festivals & Events',
    description: 'Memories from festivals and Mandal events.',
  },
  {
    title: 'Community Moments',
    description: 'Shared moments from our community.',
  },
]

function GalleryPreviewSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Our Memories
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Gallery
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5c4a42]">
              Explore moments from our cultural celebrations, community
              activities and events.
            </p>
          </div>

          <Link
            to="/gallery"
            className="text-sm font-semibold text-[#9a3412] transition-colors hover:text-[#7f1d1d]"
          >
            View Full Gallery →
          </Link>
        </div>

        {/* Gallery preview */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item) => (
            <Link
              key={item.title}
              to="/gallery"
              className="group overflow-hidden rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              {/* Placeholder image */}
              <div className="flex aspect-4/3 items-center justify-center bg-[#f5ead5]">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#9a3412] shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="8.5" cy="9" r="1.5" />
                      <path d="m21 15-4.5-4.5L8 19" />
                    </svg>
                  </div>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[#9a3412]">
                    Photo Coming Soon
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-[#3f1d1d] transition-colors group-hover:text-[#9a3412]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GalleryPreviewSection