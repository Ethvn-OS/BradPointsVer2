import { NavLink, useNavigate } from "react-router-dom"
import { LayoutDashboard, Users, Package, Gift, MessageSquare, Trash2, LogOut, User } from "lucide-react"

export default function Sidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    // clear auth token and redirect — customize to your auth flow
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-44 bg-red-700 text-white flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-red-600">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <User className="w-8 h-8 text-red-700" />
        </div>
        <h2 className="text-center font-semibold text-sm">Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavItem to="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
        <NavItem to="/users" icon={<Users className="w-5 h-5" />} label="Users" />
        <NavItem to="/products" icon={<Package className="w-5 h-5" />} label="Products" />
        <NavItem to="/rewards" icon={<Gift className="w-5 h-5" />} label="Rewards" />
        <NavItem to="/feedback" icon={<MessageSquare className="w-5 h-5" />} label="Feedback" />
      </nav>

      {/* Footer */}
      <div className="border-t border-red-600 p-4 space-y-3">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm hover:bg-red-600">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>

        <div className="bg-red-600 rounded-lg p-3 text-center text-xs">
          <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
            <User className="w-5 h-5 text-red-700" />
          </div>
          <p className="font-semibold text-sm">admin123l</p>
          <p className="text-red-200 text-xs">Administrator</p>
        </div>
      </div>
    </aside>
  )
}

function NavItem({ to = '/', icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors ${
          isActive ? 'bg-red-600' : 'hover:bg-red-600'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}
