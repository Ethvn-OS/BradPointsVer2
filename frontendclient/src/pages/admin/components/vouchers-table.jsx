"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function VouchersTable() {

  const [redemvouch, setRedemVouch] = useState([]);

  const vouchredem = async () => {
    const response = await axios.get("https://bradpoints.dcism.org/admin/vouchredem");
    setRedemVouch(response.data.vouchredem);
    console.log(response.data.vouchredem);
  }

  useEffect(() => {
    vouchredem();
  }, [])

  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(redemvouch.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedVouchers = redemvouch.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Summary of Vouchers Claimed</h2>
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
                Reward Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-red-700 uppercase tracking-wider">
                Number of Redemptions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedVouchers.map((voucher, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{voucher.reward_name}</td>
                <td className="px-6 py-3 text-sm text-gray-900 text-left">{voucher.number_of_redemptions}</td>
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



// used as dummy data before backend
/*const vouchersData = [
  { name: "FREEDRINK", redemptions: 8 },
  { name: "SIDEDISH50", redemptions: 8 },
  { name: "BUYROLLSTAKE1", redemptions: 5 },
  { name: "FREERICEMEAL", redemptions: 4 },
  { name: "FREESIOMAI", redemptions: 4 },
  { name: "FREEDESSERT", redemptions: 3 },
  { name: "FREEAPPETIZER", redemptions: 3 },
  { name: "BUYONEGETONE", redemptions: 2 },
  { name: "HAPPYHOUR50", redemptions: 2 },
  { name: "MEMBEREXCLUSIVE", redemptions: 1 },
]*/