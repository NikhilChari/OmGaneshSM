import { Link } from 'react-router-dom'

function MembershipApplicationSection() {
  return (
    <section
      id="membership-application"
      className="bg-[#4a1f1f] py-16 text-white sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fbbf24] sm:text-sm">
          Membership Application
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Become a Member?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75">
          Membership applications will be available here once the official
          application process and required information are finalized.
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#fbbf24]">
            Application Information
          </p>

          <div className="mt-4 space-y-3 text-sm leading-6 text-white/75">
            <p>
              <span className="font-semibold text-white">Application:</span>{' '}
              [APPLICATION METHOD]
            </p>

            <p>
              <span className="font-semibold text-white">Requirements:</span>{' '}
              [APPLICATION REQUIREMENTS]
            </p>

            <p>
              <span className="font-semibold text-white">Contact:</span>{' '}
              [MEMBERSHIP CONTACT INFORMATION]
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d97706] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
          >
            Contact Us
          </Link>

          <Link
            to="/events"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MembershipApplicationSection