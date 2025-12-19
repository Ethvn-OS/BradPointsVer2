"use client"

import { useState, useEffect } from "react"

export default function EditRewardModal({ isOpen, onClose, onEditReward, reward }) {
  const [formData, setFormData] = useState({ editrewname: "", editrewdesc: "", editrewpoints: "" })

  useEffect(() => {
    if (reward) {
      setFormData({
        editrewname: reward.reward_name,
        editrewdesc: reward.reward_desc,
        editrewpoints: reward.reward_points
      })
    }
  }, [reward, isOpen])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.editrewname.trim() || !formData.editrewdesc.trim() || !formData.editrewpoints) {
      alert("Please fill in all fields")
      return
    }

    await onEditReward({
      id: reward.id,
      editrewname: formData.editrewname,
      editrewdesc: formData.editrewdesc,
      editrewpoints: Number(formData.editrewpoints)
    })

    handleClose();
  }

  const handleClose = () => {
    setFormData({ name: "", description: "", pointsRequired: "" })
    onClose()
  }

  if (!isOpen || !reward) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-red-700 mb-6">Edit Reward</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reward Name</label>
            <input
              type="text"
              name="editrewname"
              value={formData.editrewname}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Enter reward name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              name="editrewdesc"
              value={formData.editrewdesc}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Enter reward description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Points Required</label>
            <input
              type="number"
              name="editrewpoints"
              value={formData.editrewpoints}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
              placeholder="Enter points required"
            />
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


