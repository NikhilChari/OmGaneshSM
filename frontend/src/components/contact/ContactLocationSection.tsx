function ContactLocationSection() {
  const googleMapsUrl = 'https://maps.app.goo.gl/UurxvjjpNos8AKEMA'

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-stretch lg:gap-12">
          {/* Location information */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
              Find Us
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
              Our Location
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5c4a42]">
              Visit the Mandal at our location. Tap the map to open the exact
              location in Google Maps and get directions.
            </p>

            <div className="mt-7 rounded-2xl border border-[#9a3412]/10 bg-[#fffaf0] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a3412]">
                Address
              </p>

              <p className="mt-3 text-sm font-medium leading-6 text-[#3f1d1d]">
                H No.60, Dandoswada, Mandrem, Goa 403527
              </p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d97706] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
            >
              Open in Google Maps
            </a>
          </div>

          {/* Interactive map link */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Om Ganesh Sanskrutik Mandal location in Google Maps"
            className="group relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-[#9a3412]/10 bg-[#fffaf0] shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg sm:min-h-[400px]"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,#9a3412_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            <div className="relative max-w-sm px-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4a1f1f] text-[#fbbf24] transition-transform group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#3f1d1d]">
                Om Ganesh Sanskrutik Mandal
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                Click to view this location on Google Maps.
              </p>

              <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#9a3412]">
                View on Google Maps
                <svg
                  viewBox="0 0 24 24"
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactLocationSection