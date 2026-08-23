function IntroductionSection() {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              About the Mandal
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              A community built around culture and togetherness
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-[#5c4a42] sm:text-lg sm:leading-8">
            <p>
              Om Ganesh Sanskrutik Mandal is a cultural society focused on
              preserving and celebrating traditions while bringing the
              community together through cultural activities and initiatives.
            </p>

            <p>
              From cultural programs and community gatherings to celebrations
              and shared experiences, the Mandal provides a place where
              tradition and community can grow together.
            </p>

            <div className="border-l-4 border-[#d97706] pl-5">
              <p className="font-medium text-[#4a1f1f]">
                A modern digital home for a traditional community organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroductionSection