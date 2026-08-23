const responsibilities = [
  {
    title: 'Respect the Community',
    description:
      'Support a welcoming environment and treat fellow members and participants with respect.',
  },
  {
    title: 'Participate Responsibly',
    description:
      'Take part in activities responsibly and follow the guidelines applicable to Mandal programs.',
  },
  {
    title: 'Support Shared Values',
    description:
      'Help maintain the cultural, community-oriented and inclusive spirit of the organization.',
  },
  {
    title: 'Keep Information Updated',
    description:
      'Provide accurate contact and membership information when required.',
  },
]

function MembershipResponsibilitiesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Member Responsibilities
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Membership Comes With Participation
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#5c4a42]">
              Membership is not only about receiving benefits. It also means
              contributing positively to the community and participating
              responsibly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {responsibilities.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-6"
              >
                <span className="text-xs font-bold tracking-[0.15em] text-[#9a3412]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="mt-4 text-lg font-bold text-[#3f1d1d]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MembershipResponsibilitiesSection