const socialLinks = [
  {
    name: 'Instagram',
    handle: '[INSTAGRAM HANDLE]',
    href: '#',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: '[FACEBOOK PAGE]',
    href: '#',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M13.5 8H12a2 2 0 0 0-2 2v10M8 13h6" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '[YOUTUBE CHANNEL]',
    href: '#',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <path d="m10 9 5 3-5 3V9Z" />
      </svg>
    ),
  },
]

function ContactSocialSection() {
  return (
    <section className="bg-[#fffaf0] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#9a3412] sm:text-sm">
          Stay Connected
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3f1d1d] sm:text-4xl">
          Follow Our Community
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5c4a42]">
          Follow the Mandal on social platforms for updates, activities,
          celebrations and community moments.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={`${social.name}: ${social.handle}`}
              className="group rounded-2xl border border-[#9a3412]/10 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-[#d97706]/30 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff7ed] text-[#9a3412] transition-colors group-hover:bg-[#4a1f1f] group-hover:text-[#fbbf24]">
                  {social.icon}
                </span>

                <div className="min-w-0">
                  <p className="font-semibold text-[#3f1d1d]">
                    {social.name}
                  </p>

                  <p className="mt-1 truncate text-sm text-[#5c4a42]">
                    {social.handle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactSocialSection