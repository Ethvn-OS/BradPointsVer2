import Sidebar from "../components/sidebar"
import StatCard from "../components/stat-card"
import CustomersTable from "../components/customers-table"
import CashiersTable from "../components/cashiers-table"
import { Users, UserCheck, Gift } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"

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

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [navigate])

  const [totalActiveCustomers, setActiveCustomers] = useState(0);
  const [totalActiveCashiers, setActiveCashiers] = useState(0);
  const [sumPoints, setSumPoints] = useState(0);
  const [listCustomers, setListCustomers] = useState([]);
  const [listCashiers, setListCashiers] = useState([]);

  const numOfCustomers = async () => {
    const response = await axios.get("http://localhost:8080/admin/countallcustomers");
    setActiveCustomers(response.data.allcust);
    console.log(response.data.allcust);
  }

  const numOfCashiers = async () => {
    const response = await axios.get("http://localhost:8080/admin/countallcashiers");
    setActiveCashiers(response.data.allcash);
    console.log(response.data.allcash);
  }

  const sumOfPoints = async () => {
    const response = await axios.get("http://localhost:8080/admin/countallpoints");
    setSumPoints(response.data.sumPoints);
    console.log(response.data.sumPoints);
  }

  const listOfCustomers = async () => {
    const response = await axios.get("http://localhost:8080/admin/allcustomers");
    setListCustomers(response.data.allcustomers);
    console.log(response.data.allcustomers);
  }

  const listOfCashiers = async () => {
    const response = await axios.get("http://localhost:8080/admin/allcashiers");
    setListCashiers(response.data.allcashiers);
    console.log(response.data.allcashiers);
  }

  useEffect(() => {
    numOfCustomers();
  }, [])

  useEffect(() => {
    numOfCashiers();
  }, [])

  useEffect(() => {
    sumOfPoints();
  }, [])

  useEffect(() => {
    listOfCustomers();
  }, [])

  useEffect(() => {
    listOfCashiers();
  }, [])

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
            <StatCard icon={<Users className="w-8 h-8 text-red-700" />} number={`${totalActiveCustomers.count_customers}`} label="Total Customers" />
            <StatCard icon={<UserCheck className="w-8 h-8 text-red-700" />} number={`${totalActiveCashiers.count_cashiers}`} label="Total Cashiers" />
            <StatCard icon={<Gift className="w-8 h-8 text-red-700" />} number={`${sumPoints.sum_points}`} label="Total Points" />
          </div>

          {/* Customers Table */}
          <CustomersTable customers={listCustomers} onCustomersChange={setListCustomers} />

          {/* Cashiers Table */}
          <CashiersTable cashiers={listCashiers} onCashiersChange={setListCashiers} />
        </div>
      </main>
    </div>
  )
}



// USED FOR TESTING FRONTEND
/*

const totalCustomers = customers.length
const totalCashiers = cashiers.length
const totalPoints = useMemo(() => customers.reduce((sum, customer) => sum + customer.points, 0), [customers])

const [customers, setCustomers] = useState(customersData)
const [cashiers, setCashiers] = useState(cashiersData)

*/