"use client"

import { useState } from "react"
import AddCashierModal from "./add-cashier-modal"

export default function CashiersTable({ cashiers = [], onCashiersChange }) {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)

  const totalPages = Math.ceil(cashiers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedCashiers = cashiers.slice(startIndex, startIndex + itemsPerPage)

  const handleAddCashier = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  const handleAddCashierSubmit = (formData) => {
    const newCashier = {
      name: formData.name,
      email: formData.email,
    }
    
    const updatedCashiers = [...cashiers, newCashier]
    onCashiersChange(updatedCashiers)
    handleCloseAddModal()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Cashiers</h2>
        <div className="flex gap-3 items-center">
          <span className="text-sm">Show:</span>
          {[10, 25, 50].map((num) => (
            <button
              key={num}
              onClick={() => {
                setItemsPerPage(num)
                setCurrentPage(1)
              }}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                itemsPerPage === num ? "bg-red-900 text-white" : "bg-red-600 hover:bg-red-600 text-white"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleAddCashier}
            className="px-4 py-1 rounded text-sm font-medium bg-white text-red-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            + Add Cashier
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCashiers.map((cashier, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{cashier.user_name}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{cashier.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer - Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      {/* Add Cashier Modal */}
      <AddCashierModal isOpen={showAddModal} onClose={handleCloseAddModal} onAddCashier={handleAddCashierSubmit} />
    </div>
  )
}
