"use client"

export default function DeleteCashierModal({ isOpen, onClose, onConfirmDelete, cashierName }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Delete Cashier</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <span className="font-semibold">{cashierName}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmDelete}
            className="flex-1 px-4 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

