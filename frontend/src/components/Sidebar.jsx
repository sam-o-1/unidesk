import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Overview' },
  { to: '/branches', label: 'Branches' },
  { to: '/employees', label: 'Employees' },
  { to: '/customers', label: 'Customers' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/payments', label: 'Payments' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/invoices', label: 'Invoices' },
  { to: '/feedback', label: 'Feedback' },
  { to: '/ask-ai', label: 'Ask AI' },
]

function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="w-64 min-h-screen bg-surface border-r border-border flex flex-col">
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-xl font-bold text-accent">UNIDESK</h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:bg-surface-hover hover:text-text'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <p className="text-sm font-semibold text-text truncate">{user?.name}</p>
        <p className="text-xs text-text-muted mb-3">{user?.role}</p>
        <button
          onClick={logout}
          className="w-full bg-accent hover:bg-accent-hover text-white rounded-lg py-2 text-sm font-medium transition"
        >
          Log Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
