const categories = [
  {
    title: 'Cultural Programs',
    description:
      'Placeholder for cultural performances, programs and traditional celebrations.',
  },
  {
    title: 'Festivals',
    description:
      'Placeholder for festival celebrations and community gatherings.',
  },
  {
    title: 'Community',
    description:
      'Placeholder for activities focused on community participation and connection.',
  },
  {
    title: 'Special Events',
    description:
      'Placeholder for special programs, initiatives and other Mandal events.',
  },
]

function EventCategoriesSection() {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            Explore
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Event Categories
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            A simple way to discover the different types of events and
            activities organized by the Mandal.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="rounded-2xl border border-[#9a3412]/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff7ed] font-bold text-[#9a3412]">
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

export default EventCategoriesSection