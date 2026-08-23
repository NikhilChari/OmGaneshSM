import { Link } from 'react-router-dom'

function EventsCtaSection() {
  return (
    <section className="bg-[#4a1f1f] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24] sm:text-sm">
          Be Part of the Community
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Join Us at Our Next Event
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75">
          Placeholder for a short invitation encouraging visitors and
          community members to participate in upcoming Mandal activities.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/membership"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d97706] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
          >
            Join Us
          </Link>

          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}

export default EventsCtaSection