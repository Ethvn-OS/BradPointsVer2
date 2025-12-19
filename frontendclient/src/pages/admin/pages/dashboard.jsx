import Sidebar from "../components/sidebar.jsx"
import Dashboard from "../components/dashboard.jsx"
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from "react"


export default function AdminPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [navigate])

  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar />
      <div className="flex-1 ml-44">
        <Dashboard />
      </div>
    </div>
  )
}
