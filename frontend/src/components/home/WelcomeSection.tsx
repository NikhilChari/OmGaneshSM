import { Link } from 'react-router-dom'

function WelcomeSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
            Welcome to Om Ganesh
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl lg:text-5xl">
            Culture, tradition and community
          </h2>

          <p className="mt-6 text-base leading-7 text-[#5c4a42] sm:text-lg sm:leading-8">
            Om Ganesh Sanskrutik Mandal is a cultural community dedicated to
            celebrating traditions, bringing people together and creating
            meaningful experiences through cultural activities and community
            initiatives.
          </p>

          <p className="mt-4 text-base leading-7 text-[#5c4a42] sm:text-lg sm:leading-8">
            Our digital home brings together our story, activities, events and
            the spirit of the community we serve.
          </p>

          <div className="mt-8">
            <Link
              to="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#9a3412]/25 bg-[#fffaf0] px-7 text-sm font-semibold text-[#9a3412] transition-colors hover:bg-[#fff7ed]"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection