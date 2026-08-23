const benefits = [
  'Participate in Mandal activities and cultural programs.',
  'Stay connected with community events and updates.',
  'Support cultural and community initiatives.',
  'Build connections with other community members.',
  'Contribute ideas, skills or time to community activities.',
  '[ADDITIONAL BENEFIT TO BE CONFIRMED]',
]

function MembershipBenefitsSection() {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Membership Benefits
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              What Membership Can Offer
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5c4a42]">
              The benefits below provide a starting point and can be updated
              once the Mandal&apos;s official membership information is
              finalized.
            </p>

            <div className="mt-7 rounded-2xl border border-[#9a3412]/10 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a3412]">
                Membership Details
              </p>

              <div className="mt-4 space-y-3 text-sm text-[#5c4a42]">
                <p>
                  <span className="font-semibold text-[#3f1d1d]">Fee:</span>{' '}
                  [MEMBERSHIP FEE]
                </p>

                <p>
                  <span className="font-semibold text-[#3f1d1d]">
                    Duration:
                  </span>{' '}
                  [MEMBERSHIP DURATION]
                </p>

                <p>
                  <span className="font-semibold text-[#3f1d1d]">
                    Eligibility:
                  </span>{' '}
                  [ELIGIBILITY INFORMATION]
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#9a3412]/10 bg-white p-7 shadow-sm sm:p-9">
            <ul className="space-y-5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff7ed] text-[#9a3412]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>

                  <span className="text-sm leading-6 text-[#5c4a42] sm:text-base">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MembershipBenefitsSection