const achievements = [
  {
    title: 'Cultural Programs',
    description:
      'Placeholder for important cultural programs, celebrations and activities organized by the Mandal.',
  },
  {
    title: 'Community Initiatives',
    description:
      'Placeholder for community-focused initiatives and activities that have made a meaningful contribution.',
  },
  {
    title: 'Growing Participation',
    description:
      'Placeholder for milestones related to community involvement, participation and engagement.',
  },
]

function AchievementsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            Milestones
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Our Achievements
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            A place to highlight meaningful milestones, programs and
            contributions from the Mandal&apos;s journey.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {achievements.map((achievement) => (
            <article
              key={achievement.title}
              className="rounded-3xl border border-[#9a3412]/10 bg-[#fffaf0] p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#9a3412]">
                <span className="text-lg font-bold">+</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#3f1d1d]">
                {achievement.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                {achievement.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection