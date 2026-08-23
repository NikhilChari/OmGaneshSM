const reasons = [
  {
    number: '01',
    title: 'Connect',
    description:
      'Be part of a community where people can connect through shared cultural and community experiences.',
  },
  {
    number: '02',
    title: 'Participate',
    description:
      'Take part in cultural programs, celebrations and community activities organized by the Mandal.',
  },
  {
    number: '03',
    title: 'Contribute',
    description:
      'Support community initiatives and contribute time, ideas and participation where appropriate.',
  },
]

function MembershipIntroSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            Why Membership
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            More Than a Membership
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            Membership is an opportunity to stay connected with the Mandal and
            participate in the community&apos;s cultural journey.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <article
              key={reason.number}
              className="rounded-3xl border border-[#9a3412]/10 bg-[#fffaf0] p-7 shadow-sm sm:p-8"
            >
              <span className="text-sm font-bold tracking-[0.15em] text-[#9a3412]">
                {reason.number}
              </span>

              <h3 className="mt-5 text-xl font-bold text-[#3f1d1d]">
                {reason.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MembershipIntroSection