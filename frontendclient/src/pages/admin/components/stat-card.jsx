export default function StatCard({ icon, number, label }) {
  return (
    <div className="bg-white rounded-lg border-l-4 border-red-700 p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-3xl font-bold text-red-700">{number}</p>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      </div>
    </div>
  )
}
