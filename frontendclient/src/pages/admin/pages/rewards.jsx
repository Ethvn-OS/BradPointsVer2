import Sidebar from "../components/sidebar"
import StatCard from "../components/stat-card"
import RewardsTable from "../components/rewards-table"
import { Gift } from "lucide-react"
import { useState } from "react"

export const metadata = {
  title: "Rewards - Admin Dashboard",
  description: "Manage rewards and redemptions",
}

const initialRewards = [
  {
    id: 1,
    name: "FREEDRINK",
    description: "Get a free drink of any choice from any Breadies location!",
    pointsRequired: 25,
  },
  {
    id: 2,
    name: "SIDEDISH50",
    description: "Get Php 50 off any side dish order at any Breadies location",
    pointsRequired: 50,
  },
  {
    id: 3,
    name: "BUYROLLSTAKE1",
    description: "Receive a Buy 1 Take 1 promo for any rice meal order at any...",
    pointsRequired: 75,
  },
  {
    id: 4,
    name: "FREERICEMEAL",
    description: "Get a rice meal of your choice from any Breadies location!",
    pointsRequired: 100,
  },
  {
    id: 5,
    name: "FREESIOMAI",
    description: "Receive one free order of Breadies siomai",
    pointsRequired: 125,
  },
]

export default function RewardsPage() {
  const [rewards, setRewards] = useState(initialRewards)

  const totalRewards = rewards.length

  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar activePage="rewards" />
      <main className="flex-1 overflow-auto ml-44">
        <header className=" border-b-2 border-red-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-red-700">Rewards</h1>
        </header>
        <div className="p-8">
          <div className="mb-8">
            <StatCard
              icon={<Gift className="w-8 h-8 text-red-700" />}
              number={totalRewards.toString()}
              label="Total Rewards"
            />
          </div>
          <RewardsTable rewards={rewards} onRewardsChange={setRewards} />
        </div>
      </main>
    </div>
  )
}
