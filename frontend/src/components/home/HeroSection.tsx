import { Link } from 'react-router-dom'

import heroImage from '@/assets/hero/hero.png'

function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#fff9ed]"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.2),transparent_42%)]" />

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:py-16">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#7f1d1d]">
            Culture • Community • Tradition
          </p>

          <h1
            id="hero-title"
            className="text-balance text-4xl font-bold tracking-tight text-[#292524] sm:text-5xl lg:text-6xl"
          >
            Om Ganesh Sanskrutik Mandal
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#57534e] sm:text-xl">
            Celebrating our culture, bringing our community together, and
            carrying cherished traditions forward for generations.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/membership"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#d97706] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b45309] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f1d1d]"
            >
              Join Us
            </Link>
            <Link
              to="/events"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#7f1d1d]/30 bg-white/70 px-6 py-3 text-sm font-semibold text-[#7f1d1d] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f1d1d]"
            >
              Explore Events
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-3 rounded-[2rem] bg-[#d4a017]/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d4a017]/30 bg-white p-2 shadow-xl shadow-[#7f1d1d]/10">
            <img
              src={heroImage}
              alt="Om Ganesh Sanskrutik Mandal cultural event"
              className="aspect-4/3 w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
