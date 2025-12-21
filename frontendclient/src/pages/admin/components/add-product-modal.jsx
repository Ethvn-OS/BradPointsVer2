"use client"

import { useState } from "react"
import axios from "axios"

const categoryOptions = [
  {id: 1, name: "Rice Meals & Soup"},
  {id: 2, name: "Rolls"},
  {id: 3, name: "Side Dishes"}
]

export default function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({ prodname: "", prodcategory: "" })

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.prodname.trim() || !formData.prodcategory) {
      alert("Please fill in all fields")
      return
    }

    // onAddProduct(formData)
    try {
      const response = await axios.post("https://bradpoints.dcism.org/admin/createprod", {
        prodname: formData.prodname,
        prodcategory: Number(formData.prodcategory)
      });
      console.log(response);
      await onAddProduct();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  const handleClose = () => {
    setFormData({ prodname: "", prodcategory: "" })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-red-700 mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="prodname"
              value={formData.prodname}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="prodcategory"
              value={formData.prodcategory}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              <option value="">Select a category</option>
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
