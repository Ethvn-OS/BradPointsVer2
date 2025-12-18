"use client"

import { useState } from "react"
import AddProductModal from "./add-product-modal"
import EditProductModal from "./edit-product-modal"
import DeleteProductConfirmModal from "./delete-product-confirm-modal"

const initialProducts = [
  {
    id: 1,
    name: "Chicken Rice",
    category: "Rice Meals & Soup",
  },
  {
    id: 2,
    name: "Beef Rice",
    category: "Rice Meals & Soup",
  },
  {
    id: 3,
    name: "Steamed Rice",
    category: "Rice Meals & Soup",
  },
  {
    id: 4,
    name: "Batchoy",
    category: "Rice Meals & Soup",
  },
  {
    id: 5,
    name: "Spring Rolls",
    category: "Spring Rolls",
  },
]

const categoryColors = {
  1: "bg-orange-200 text-orange-800",
  2: "bg-red-200 text-red-800",
  3: "bg-yellow-200 text-yellow-800",
}

const categoryNames = {
  1: "Rice Meals & Soup",
  2: "Rolls",
  3: "Side Dishes"
}

export default function ProductsTable({ products: propsProducts, onProductsChange }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productToDelete, setProductToDelete] = useState(null)
  
  // Use provided products or fall back to local state
  const products = propsProducts || initialProducts
  
  const setProducts = (updatedProducts) => {
    if (onProductsChange) {
      onProductsChange(updatedProducts)
    }
  }

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedProducts = products.slice(startIdx, startIdx + itemsPerPage)

  const handleAddProduct = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  const handleAddProductSubmit = (formData) => {
    const newProduct = {
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      name: formData.name,
      category: formData.category,
    }
    setProducts([...products, newProduct])
    handleCloseAddModal()
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedProduct(null)
  }

  const handleEditProductSubmit = (productId, formData) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, name: formData.name, category: formData.category } : p
      )
    )
    handleCloseEditModal()
  }

  const handleDelete = (product) => {
    setProductToDelete(product)
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setProductToDelete(null)
  }

  const handleConfirmDelete = () => {
    setProducts(products.filter((p) => p.id !== productToDelete.id))
    handleCloseDeleteModal()
  }

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Products</h2>
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
            onClick={handleAddProduct}
            className="px-4 py-1 rounded text-sm font-medium bg-white text-red-700 hover:bg-gray-100 transition-colors cursor-pointer">
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{product.prod_name}</td>
                <td className="px-6 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[product.category_id] || "bg-gray-200 text-gray-800"}`}
                  >
                    {categoryNames[product.category_id]}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button 
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 rounded text-xs font-medium text-red-700 bg-white border border-red-700 hover:bg-red-50 transition-colors cursor-pointer">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(product)}
                    className="px-3 py-1 rounded text-xs font-medium text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer">
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
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-red-700 rounded hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>

      {/* Add Product Modal */}
      <AddProductModal isOpen={showAddModal} onClose={handleCloseAddModal} onAddProduct={handleAddProductSubmit} />

      {/* Edit Product Modal */}
      <EditProductModal isOpen={showEditModal} onClose={handleCloseEditModal} onEditProduct={handleEditProductSubmit} product={selectedProduct} />

      {/* Delete Product Confirmation Modal */}
      <DeleteProductConfirmModal isOpen={showDeleteModal} onClose={handleCloseDeleteModal} onConfirmDelete={handleConfirmDelete} productName={productToDelete?.name} />
    </div>
  )
}
