"use client"

export default function FeedbackChart() {
  const data = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 52 },
    { day: "Wed", value: 68 },
    { day: "Thu", value: 58 },
    { day: "Fri", value: 85 },
    { day: "Sat", value: 72 },
    { day: "Sun", value: 55 },
  ]

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex justify-between items-start mb-6 p-6 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Feedback This Week</h3>
          <p className="text-sm text-gray-600">Weekly feedback submissions</p>
        </div>
        <div className="bg-black text-white text-sm px-3 py-1.5 rounded-lg font-medium">435 Total</div>
      </div>

      <div className="px-6 py-8">
        <div className="flex items-end justify-between h-64 gap-3">
          {data.map((item, index) => {
            const height = (item.value / maxValue) * 100
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full">
                <div className="relative h-full w-full flex flex-col items-center justify-end group">
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {item.value} submissions
                  </div>
                  {/* Bar */}
                  <div
                    className="w-full bg-gradient-to-t from-red-700 to-red-600 rounded-t-lg transition-all duration-300 hover:from-red-800 hover:to-red-700 cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium mt-2">{item.day}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100 px-6 pb-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-600 mb-1">Peak Day</p>
          <p className="text-sm font-semibold text-gray-900">Friday - 85</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-1">Average Daily</p>
          <p className="text-sm font-semibold text-gray-900">62 submissions</p>
        </div>
      </div>
    </div>
  )
}
