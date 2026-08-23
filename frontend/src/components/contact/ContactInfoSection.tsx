const contactDetails = [
  {
    title: 'Email',
    value: '[omganeshsanskrutikmandal@gmail.com]',
    description: 'Send us your questions or enquiries.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    title: 'Phone',
    value: '[PHONE NUMBER]',
    description: 'Contact the Mandal during the appropriate hours.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    title: 'Location',
    value: '[H No.60, Dandoswada, Mandrem, Goa 403527]',
    description: 'Visit us at the Mandal location.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
]

function ContactInfoSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {contactDetails.map((detail) => (
            <article
              key={detail.title}
              className="rounded-3xl border border-[#9a3412]/10 bg-[#fffaf0] p-7 shadow-sm sm:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#9a3412]">
                {detail.icon}
              </div>

              <h2 className="mt-6 text-xl font-bold text-[#3f1d1d]">
                {detail.title}
              </h2>

              <p className="mt-3 break-words text-sm font-semibold text-[#9a3412]">
                {detail.value}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#5c4a42]">
                {detail.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactInfoSection