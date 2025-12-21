"use client"
import StatCard from "./stat-card"
import { useState, useEffect } from "react"
import axios from "axios"
import VouchersTable from "./vouchers-table"
import { ClipboardList, Gift } from 'lucide-react';
import VoucherClaimHistory from "../components/voucher-claim-history.jsx"
export default function Dashboard() {

  const [activeRewards, setActiveRewards] = useState(0);
  const [totalRedem, setTotalRedem] = useState(0);

  const numOfActiveRewards = async () => {
    const response = await axios.get("https://bradpoints.dcism.org/admin/countReward");
    setActiveRewards(response.data.count);
    console.log(response.data.count);
  }

  const totalRedemptions = async () => {
    const response = await axios.get("https://bradpoints.dcism.org/admin/countallredem");
    setTotalRedem(response.data.redem);
    console.log(response.data.redem);
  }

  useEffect(() => {
    numOfActiveRewards();
  }, [])

  useEffect(() => {
    totalRedemptions();
  }, [])

  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <div className=" border-b-2 border-red-700 px-8 py-6">
        <h1 className="text-3xl font-bold text-red-700">Dashboard</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <StatCard icon={<ClipboardList className="w-8 h-8 text-red-700"/>} number={`${activeRewards.count_reward}`} label="Active Rewards" />
          <StatCard icon={<Gift className="w-8 h-8 text-red-700"/>} number={`${totalRedem.count_redem}`} label="Total Redemptions" />
        </div>

        {/* Vouchers Table */}
        <VouchersTable />

         <div className="mt-8">
          <VoucherClaimHistory />
        </div>
      </div>
    </main>
  )
}
