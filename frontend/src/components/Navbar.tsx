import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Membership', path: '/membership' },
  { name: 'Contact', path: '/contact' },
]

function Navbar() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-bold">
          Om Ganesh Sports &amp; Masti
        </NavLink>

        <div className="flex items-center gap-6">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'font-semibold' : 'text-muted-foreground'
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar