const steps = [
  {
    number: '01',
    title: 'Review Information',
    description:
      'Review the membership information, eligibility and requirements provided by the Mandal.',
  },
  {
    number: '02',
    title: 'Submit Application',
    description:
      'Complete the membership application with the required information.',
  },
  {
    number: '03',
    title: 'Confirmation',
    description:
      'Your application can be reviewed and confirmed according to the Mandal membership process.',
  },
]

function MembershipProcessSection() {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            How It Works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
            Becoming a Member
          </h2>

          <p className="mt-5 text-base leading-7 text-[#5c4a42]">
            A simple three-step structure for joining the community.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="relative rounded-3xl border border-[#9a3412]/10 bg-white p-7 shadow-sm sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4a1f1f] text-sm font-bold text-[#fbbf24]">
                {step.number}
              </span>

              <h3 className="mt-6 text-xl font-bold text-[#3f1d1d]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4a42]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MembershipProcessSection