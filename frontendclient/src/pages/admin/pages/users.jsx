import Sidebar from "../components/sidebar"
import StatCard from "../components/stat-card"
import CustomersTable from "../components/customers-table"
import CashiersTable from "../components/cashiers-table"
import { Users, UserCheck, Gift } from "lucide-react"
import { useState, useMemo } from "react"

const customersData = [
  { username: "Ethan", email: "", points: 117 },
  { username: "YzaLord", email: "yza@gmail.com", points: 100 },
  { username: "*testuser007", email: "test007@gmail.com", points: 325 },
  { username: "*testuser004", email: "test004@gmail.com", points: 70 },
  { username: "Aimee_123", email: "aimee123@gmail.com", points: 5 },
  { username: "JohnDoe", email: "john@gmail.com", points: 250 },
  { username: "SarahSmith", email: "sarah@gmail.com", points: 180 },
  { username: "MikeJohnson", email: "mike@gmail.com", points: 95 },
  { username: "EmilyBrown", email: "emily@gmail.com", points: 420 },
  { username: "DavidLee", email: "david@gmail.com", points: 210 },
]

const cashiersData = [
  { name: "Juan", email: "juan@gmail.com" },
  { name: "Maria", email: "maria@gmail.com" },
  { name: "Pedro", email: "pedro@gmail.com" },
]

export default function UsersPage() {
  const [customers, setCustomers] = useState(customersData)
  const [cashiers, setCashiers] = useState(cashiersData)

  const totalCustomers = customers.length
  const totalCashiers = cashiers.length
  const totalPoints = useMemo(() => customers.reduce((sum, customer) => sum + customer.points, 0), [customers])

  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden ml-44">
        
       {/* Header */}
      <div className=" border-b-2 border-red-700 px-8 py-6">
        <h1 className="text-3xl font-bold text-red-700">Users</h1>
      </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-6">
            <StatCard icon={<Users className="w-8 h-8 text-red-700" />} number={totalCustomers.toString()} label="Total Customers" />
            <StatCard icon={<UserCheck className="w-8 h-8 text-red-700" />} number={totalCashiers.toString()} label="Total Cashiers" />
            <StatCard icon={<Gift className="w-8 h-8 text-red-700" />} number={totalPoints.toString()} label="Total Points" />
          </div>

          {/* Customers Table */}
          <CustomersTable customers={customers} onCustomersChange={setCustomers} />

          {/* Cashiers Table */}
          <CashiersTable cashiers={cashiers} onCashiersChange={setCashiers} />
        </div>
      </main>
    </div>
  )
}
