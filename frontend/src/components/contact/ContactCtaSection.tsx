import { Link } from 'react-router-dom'

function ContactCtaSection() {
  return (
    <section className="bg-[#4a1f1f] py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24] sm:text-sm">
          Stay Involved
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Explore What We Do
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75">
          Discover upcoming events, learn more about the Mandal and find
          opportunities to participate in the community.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/events"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d97706] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
          >
            Explore Events
          </Link>

          <Link
            to="/membership"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Become a Member
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ContactCtaSection