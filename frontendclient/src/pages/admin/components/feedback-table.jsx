"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function FeedbackTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [allFeedback, setAllFeedback] = useState([]);

  const allFeed = async () => {
    const response = await axios.get('http://localhost:8080/admin/allfeedback');
    setAllFeedback(response.data.allfeedback);
    console.log(response.data.allfeedback);
  }

  useEffect(() => {
    allFeed();
  })

  const totalPages = Math.ceil(allFeedback.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = allFeedback.slice(startIndex, startIndex + itemsPerPage)

  const getRatingStars = (rating) => {
    return "⭐".repeat(rating)
  }

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600"
    if (rating === 3) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Customer Feedback</h2>
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
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{item.user_name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`font-semibold ${getRatingColor(item.rating)}`}>
                    {getRatingStars(item.rating)} {item.rating}/5
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-md">{item.content}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(item.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-6 py-4 flex justify-center items-center gap-3 border-t border-gray-200">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-red-700 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-800 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}



  // const feedbackData = [
  //   {
  //     id: "FB001",
  //     customerName: "Ethan",
  //     rating: 5,
  //     feedback: "Excellent service! The staff was very friendly and helpful.",
  //     date: "2024-01-15",
  //   },
  //   {
  //     id: "FB002",
  //     customerName: "YzstLord",
  //     rating: 4,
  //     feedback: "Great food quality, but the wait time was a bit long.",
  //     date: "2024-01-14",
  //   },
  //   {
  //     id: "FB003",
  //     customerName: "*testuser007",
  //     rating: 5,
  //     feedback: "Amazing experience! Will definitely come back again.",
  //     date: "2024-01-14",
  //   },
  //   {
  //     id: "FB004",
  //     customerName: "*testuser004",
  //     rating: 3,
  //     feedback: "Food was okay, nothing special. Service could be improved.",
  //     date: "2024-01-13",
  //   },
  //   {
  //     id: "FB005",
  //     customerName: "Aimee_123",
  //     rating: 4,
  //     feedback: "Love the variety of rewards. The redemption process is smooth.",
  //     date: "2024-01-13",
  //   },
  //   {
  //     id: "FB006",
  //     customerName: "Sarah_M",
  //     rating: 5,
  //     feedback: "Best rice meals in town! Keep up the good work.",
  //     date: "2024-01-12",
  //   },
  //   {
  //     id: "FB007",
  //     customerName: "Mike_Johnson",
  //     rating: 2,
  //     feedback: "Disappointed with the portion size for the price.",
  //     date: "2024-01-12",
  //   },
  //   {
  //     id: "FB008",
  //     customerName: "Emma_Lee",
  //     rating: 5,
  //     feedback: "The free drink reward is awesome! Great loyalty program.",
  //     date: "2024-01-11",
  //   },
  //   {
  //     id: "FB009",
  //     customerName: "David_Wong",
  //     rating: 4,
  //     feedback: "Good food, clean restaurant. Could use more seating.",
  //     date: "2024-01-11",
  //   },
  //   {
  //     id: "FB010",
  //     customerName: "Lisa_Chen",
  //     rating: 3,
  //     feedback: "Average experience. The staff seemed rushed.",
  //     date: "2024-01-10",
  //   },
  //   {
  //     id: "FB011",
  //     customerName: "Tom_Brown",
  //     rating: 5,
  //     feedback: "Fantastic customer service and delicious meals!",
  //     date: "2024-01-10",
  //   },
  //   {
  //     id: "FB012",
  //     customerName: "Anna_Garcia",
  //     rating: 4,
  //     feedback: "Really enjoyed my meal. Will recommend to friends.",
  //     date: "2024-01-09",
  //   },
  // ]