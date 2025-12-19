"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function EditCustomerModal({ isOpen, onClose, onEditCustomer, customer }) {
  const [formData, setFormData] = useState({ username: "", email: "", points: 0, password: "" })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (customer) {
      setFormData({
        username: customer.username,
        email: customer.email,
        points: customer.points,
        password: "",
      })
    }
  }, [customer, isOpen])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.username.trim() || !formData.email.trim()) {
      alert("Please fill in all fields")
      return
    }

    onEditCustomer(customer.username, formData)
    setFormData({ username: "", email: "", points: 0, password: "" })
  }

  const handleClose = () => {
    setFormData({ username: "", email: "", points: 0, password: "" })
    setShowPassword(false)
    onClose()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if (!isOpen || !customer) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-red-700 mb-6">Edit Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Enter customer username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Enter customer email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
            <input
              type="number"
              name="points"
              value={formData.points}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Enter points"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Leave blank to keep current password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer p-1"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
