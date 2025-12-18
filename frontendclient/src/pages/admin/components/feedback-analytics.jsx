"use client"

export default function FeedbackAnalytics() {
  const analytics = [
    { label: "Average Handle Time", percentage: 85, color: "from-blue-400 to-blue-600" },
    { label: "Service Level Agreement", percentage: 92, color: "from-orange-400 to-orange-600" },
    { label: "Customer Satisfaction", percentage: 88, color: "from-green-400 to-green-600" },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics</h3>
      <div className="space-y-6">
        {analytics.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <span className="text-sm font-bold text-[#8B4842]">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Response Time</span>
          <span className="text-sm font-semibold text-gray-900">2.5 min</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Resolution Rate</span>
          <span className="text-sm font-semibold text-gray-900">87%</span>
        </div>
      </div>
    </div>
  )
}
