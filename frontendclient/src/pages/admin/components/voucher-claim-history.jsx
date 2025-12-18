"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function VoucherClaimHistory() {

  const [claimHistory, setClaimHistory] = useState([]);

  const claimHist = async () => {
    const response = await axios.get("http://localhost:8080/admin/allredem");
    setClaimHistory(response.data.allredem);
    console.log(response.data.allredem);
  }

  useEffect(() => {
    claimHist();
  }, [])

  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(claimHistory.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedHistory = claimHistory.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Voucher Claim History</h2>
        <div className="flex gap-2">
          <span className="text-sm">Show:</span>
          {[5, 10, 20].map((num) => (
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Cashier ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Reward Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Redemption ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedHistory.map((record, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{record.user_name}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{record.cashier_id}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{record.reward_name}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{record.redemption_id}</td>
                <td className="px-6 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      record.status === "Claimed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
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
    </div>
  )
}



// USED DURING TESTING PHASE
/*const claimHistoryData = [
  { username: "Ethan", cashierId: "CSH001", rewardName: "FREEDRINK", redemptionId: "RDM001", status: "claimed" },
  { username: "YzstLord", cashierId: "CSH002", rewardName: "SIDEDISH50", redemptionId: "RDM002", status: "claimed" },
  {
    username: "*testuser007",
    cashierId: "CSH001",
    rewardName: "BUYROLLSTAKE1",
    redemptionId: "RDM003",
    status: "claimed",
  },
  {
    username: "*testuser004",
    cashierId: "CSH003",
    rewardName: "FREERICEMEAL",
    redemptionId: "RDM004",
    status: "unclaimed",
  },
  { username: "Aimee_123", cashierId: "CSH002", rewardName: "FREEDRINK", redemptionId: "RDM005", status: "claimed" },
  { username: "Ethan", cashierId: "CSH001", rewardName: "FREESIOUMAI", redemptionId: "RDM006", status: "claimed" },
  { username: "YzstLord", cashierId: "CSH003", rewardName: "SIDEDISH50", redemptionId: "RDM007", status: "unclaimed" },
  { username: "*testuser007", cashierId: "CSH002", rewardName: "FREEDRINK", redemptionId: "RDM008", status: "claimed" },
  {
    username: "Aimee_123",
    cashierId: "CSH001",
    rewardName: "BUYROLLSTAKE1",
    redemptionId: "RDM009",
    status: "claimed",
  },
  {
    username: "*testuser004",
    cashierId: "CSH003",
    rewardName: "FREERICEMEAL",
    redemptionId: "RDM010",
    status: "claimed",
  },
]*/