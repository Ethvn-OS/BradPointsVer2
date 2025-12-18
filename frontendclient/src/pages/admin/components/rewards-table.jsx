"use client"

import { useState } from "react"
import AddRewardModal from "./add-reward-modal"
import EditRewardModal from "./edit-reward-modal"
import DeleteRewardModal from "./delete-reward-modal"

export default function RewardsTable({ rewards = [], onRewardsChange }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [rewardToDelete, setRewardToDelete] = useState(null)

  const totalPages = Math.max(1, Math.ceil((rewards.length || 1) / itemsPerPage))
  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedRewards = rewards.slice(startIdx, startIdx + itemsPerPage)

  const handleAddReward = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  const handleAddRewardSubmit = (formData) => {
    const parsedPoints = Number(formData.pointsRequired)
    const safePoints = Number.isNaN(parsedPoints) ? 0 : parsedPoints

    const newId = rewards.length ? Math.max(...rewards.map((r) => r.id)) + 1 : 1

    const newReward = {
      id: newId,
      name: formData.name,
      description: formData.description,
      pointsRequired: safePoints,
    }

    const updatedRewards = [...rewards, newReward]
    onRewardsChange(updatedRewards)
    handleCloseAddModal()
  }

  const handleEdit = (reward) => {
    setSelectedReward(reward)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedReward(null)
  }

  const handleEditRewardSubmit = (originalId, formData) => {
    const parsedPoints = Number(formData.pointsRequired)
    const safePoints = Number.isNaN(parsedPoints) ? 0 : parsedPoints

    const updatedRewards = rewards.map((r) =>
      r.id === originalId
        ? {
            ...r,
            name: formData.name,
            description: formData.description,
            pointsRequired: safePoints,
          }
        : r
    )

    onRewardsChange(updatedRewards)
    handleCloseEditModal()
  }

  const handleDelete = (reward) => {
    setRewardToDelete(reward)
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setRewardToDelete(null)
  }

  const handleConfirmDelete = () => {
    const updatedRewards = rewards.filter((r) => r.id !== rewardToDelete.id)
    onRewardsChange(updatedRewards)
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
        <h2 className="text-lg font-semibold">Rewards</h2>
        <div className="flex gap-3 items-center">
          <span className="text-sm">Show:</span>
          {[5, 10, 15].map((num) => (
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
            onClick={handleAddReward}
            className="px-4 py-1 rounded text-sm font-medium bg-white text-red-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            + Add Reward
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Reward Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Points Required</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedRewards.map((reward) => (
              <tr key={reward.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{reward.reward_name}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{reward.reward_desc}</td>
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{reward.reward_points}</td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button
                    onClick={() => handleEdit(reward)}
                    className="px-3 py-1 rounded text-xs font-medium text-red-700 bg-white border border-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(reward)}
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

      {/* Modals */}
      <AddRewardModal isOpen={showAddModal} onClose={handleCloseAddModal} onAddReward={handleAddRewardSubmit} />

      <EditRewardModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        onEditReward={handleEditRewardSubmit}
        reward={selectedReward}
      />

      <DeleteRewardModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirmDelete={handleConfirmDelete}
        rewardName={rewardToDelete?.name}
      />
    </div>
  )
}
