"use client"

import { useState } from "react"
import AddCustomerModal from "./add-customer-modal"
import EditCustomerModal from "./edit-customer-modal"
import DeleteConfirmModal from "./delete-confirm-modal"

export default function CustomersTable({ customers = [], onCustomersChange }) {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [customerToDelete, setCustomerToDelete] = useState(null)

  const totalPages = Math.ceil(customers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedCustomers = customers.slice(startIndex, startIndex + itemsPerPage)

  const handleAddCustomer = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  const [values, setValues] = useState({
    // insert lang nya
  })

  const handleAddCustomerSubmit = (formData) => {
    const newCustomer = {
      username: formData.username,
      email: formData.email,
      points: 0,
    }

    const updatedCustomers = [...customers, newCustomer]
    onCustomersChange(updatedCustomers)
    handleCloseAddModal()
  }

  const handleEdit = (customer) => {
    setSelectedCustomer(customer)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedCustomer(null)
  }

  const handleEditCustomerSubmit = (originalUsername, formData) => {
    // Ensure points is always stored as a number to avoid string concatenation issues
    const parsedPoints = Number(formData.points)

    const updatedCustomers = customers.map((c) =>
      c.username === originalUsername
        ? {
            ...c,
            username: formData.username,
            email: formData.email,
            points: Number.isNaN(parsedPoints) ? 0 : parsedPoints,
          }
        : c
    )
    onCustomersChange(updatedCustomers)
    handleCloseEditModal()
  }

  const handleDelete = (customer) => {
    setCustomerToDelete(customer)
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setCustomerToDelete(null)
  }

  const handleConfirmDelete = () => {
    const updatedCustomers = customers.filter((c) => c.username !== customerToDelete.username)
    onCustomersChange(updatedCustomers)
    handleCloseDeleteModal()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Customers</h2>
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
            onClick={handleAddCustomer}
            className="px-4 py-1 rounded text-sm font-medium bg-white text-red-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            + Add Customer
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Points
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCustomers.map((customer, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{customer.user_name}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{customer.email}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{customer.points}</td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="px-3 py-1 rounded text-xs font-medium text-red-700 bg-white border border-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer)}
                    className="px-3 py-1 rounded text-xs font-medium text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
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

      {/* Add Customer Modal */}
      <AddCustomerModal isOpen={showAddModal} onClose={handleCloseAddModal} onAddCustomer={handleAddCustomerSubmit} />

      {/* Edit Customer Modal */}
      <EditCustomerModal isOpen={showEditModal} onClose={handleCloseEditModal} onEditCustomer={handleEditCustomerSubmit} customer={selectedCustomer} />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal isOpen={showDeleteModal} onClose={handleCloseDeleteModal} onConfirmDelete={handleConfirmDelete} customerName={customerToDelete?.username} />
    </div>
  )
}
