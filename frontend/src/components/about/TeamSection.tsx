const teamMembers = [
  {
    role: 'Leadership',
    description:
      'Placeholder for the Mandal leadership team and their responsibilities.',
  },
  {
    role: 'Organizers',
    description:
      'Placeholder for organizers who help coordinate cultural programs and community activities.',
  },
  {
    role: 'Volunteers',
    description:
      'Placeholder for the volunteers who contribute their time and effort to Mandal activities.',
  },
]

function TeamSection() {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            The People Behind the Work
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Our Team
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            Placeholder content for the people and groups who help guide,
            organize and support the Mandal.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={member.role}
              className="rounded-3xl border border-[#9a3412]/10 bg-white p-7 text-center shadow-sm"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f5ead5] text-[#4a1f1f]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 21c.8-4 3.2-6 7-6s6.2 2 7 6" />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#3f1d1d]">
                {member.role}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                {member.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection