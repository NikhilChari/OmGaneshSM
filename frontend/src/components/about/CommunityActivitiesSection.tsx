const activities = [
  {
    title: 'Cultural Celebrations',
    description:
      'Placeholder for festivals, cultural programs and celebrations organized by the Mandal.',
  },
  {
    title: 'Community Initiatives',
    description:
      'Placeholder for activities that encourage participation, connection and community support.',
  },
  {
    title: 'Volunteer Activities',
    description:
      'Placeholder for opportunities where members and volunteers contribute to the community.',
  },
  {
    title: 'Shared Traditions',
    description:
      'Placeholder for activities that help preserve and share cultural traditions across generations.',
  },
]

function CommunityActivitiesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Community
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Culture in Action
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5c4a42]">
              Placeholder content describing the ways the Mandal brings
              culture, community and shared experiences together.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {activities.map((activity) => (
              <article
                key={activity.title}
                className="rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-6"
              >
                <h3 className="text-lg font-bold text-[#3f1d1d]">
                  {activity.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                  {activity.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityActivitiesSection