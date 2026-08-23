import { useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Membership', path: '/membership' },
  { label: 'Contact', path: '/contact' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="border-b border-amber-900/10 bg-[#fffaf0]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-base font-bold leading-tight text-[#4a1f1f] sm:text-lg"
        >
          <span className="block">Om Ganesh</span>
          <span className="block text-[#9a3412]">Sanskrutik Mandal</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium text-[#4a1f1f]/75 transition-colors hover:text-[#c2410c]"
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/membership"
            className="rounded-full bg-[#d97706] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b45309]"
          >
            Join Us
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#4a1f1f]/15 text-[#4a1f1f] transition-colors hover:bg-[#f5ead5] md:hidden"
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-amber-900/10 bg-[#fffaf0] px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[#4a1f1f] transition-colors hover:bg-[#f5ead5]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/membership"
              onClick={closeMenu}
              className="mt-2 rounded-lg bg-[#d97706] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Join Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar