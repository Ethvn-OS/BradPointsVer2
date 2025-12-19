import Sidebar from "../components/sidebar"
import FeedbackTable from "../components/feedback-table"
import FeedbackAnalytics from "../components/feedback-analytics"
import FeedbackChart from "../components/feedback-chart"
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from "react"

export default function FeedbackPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [navigate])

  return (
    <div className="flex min-h-screen bg-amber-50">
      <Sidebar />
      <main className="flex-1 flex flex-col ml-44">
        {/* Header */}
        <div className="border-b-2 border-red-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-red-700">Feedback</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Feedback</p>
                <p className="text-xs text-gray-500">All time submissions</p>
              </div>
              <div className="bg-red-50 p-2 rounded-lg">
                <svg className="w-5 h-5 text-[#A3544F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">247</p>
              <div className="bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                <p className="text-xs text-gray-500">Customer satisfaction score</p>
              </div>
              <div className="bg-red-50 p-2 rounded-lg">
                <svg className="w-5 h-5 text-[#A3544F]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">4.2</p>
              <div className="bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Satisfaction Rate</p>
                <p className="text-xs text-gray-500">Positive feedback ratio</p>
              </div>
              <div className="bg-red-50 p-2 rounded-lg">
                <svg className="w-5 h-5 text-[#A3544F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">88%</p>
              <div className="bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                <p className="text-xs text-gray-500">Issues addressed</p>
              </div>
              <div className="bg-red-50 p-2 rounded-lg">
                <svg className="w-5 h-5 text-[#A3544F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-gray-900">215</p>
              <div className="bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <FeedbackChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeedbackTable />
          </div>
          <div className="space-y-6">
            <FeedbackAnalytics />
          </div>
        </div>
        </div>
      </main>
    </div>
  )
}
