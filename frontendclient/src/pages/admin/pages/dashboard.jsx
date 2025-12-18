import Sidebar from "../components/sidebar.jsx"
import Dashboard from "../components/dashboard.jsx"


export default function AdminPage() {
  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar />
      <div className="flex-1 ml-44">
        <Dashboard />
      </div>
    </div>
  )
}
