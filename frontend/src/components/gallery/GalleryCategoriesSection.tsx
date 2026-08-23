const categories = [
  {
    title: 'Festivals',
    description:
      'Memories from festival celebrations and traditional occasions.',
  },
  {
    title: 'Cultural Programs',
    description:
      'Performances, cultural programs and community celebrations.',
  },
  {
    title: 'Community Activities',
    description:
      'Moments from activities that bring our community together.',
  },
  {
    title: 'Special Events',
    description:
      'A collection of special programs and memorable occasions.',
  },
]

function GalleryCategoriesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            Explore
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Browse Our Memories
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            Explore photographs and memories organized around the activities
            and celebrations of our community.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed] text-sm font-bold text-[#9a3412]">
                {String(index + 1).padStart(2, '0')}
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#3f1d1d]">
                {category.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                {category.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GalleryCategoriesSection