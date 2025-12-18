import Sidebar from "../components/sidebar"
import StatCard from "../components/stat-card"
import ProductsTable from "../components/products-table"
import { Package, Utensils, Shell, LeafyGreen } from 'lucide-react'
import { useState } from "react"

const initialProducts = [
  {
    id: 1,
    name: "Chicken Rice",
    category: "Rice Meals & Soup",
  },
  {
    id: 2,
    name: "Beef Rice",
    category: "Rice Meals & Soup",
  },
  {
    id: 3,
    name: "Steamed Rice",
    category: "Rice Meals & Soup",
  },
  {
    id: 4,
    name: "Batchoy",
    category: "Rice Meals & Soup",
  },
]

export const metadata = {
  title: "Products - Admin Dashboard",
  description: "Manage products and categories",
}

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)

  const totalProducts = products.length
  const riceMealsCount = products.filter((p) => p.category === "Rice Meals & Soup").length
  const rollsCount = products.filter((p) => p.category === "Rolls").length
  const sideDishesCount = products.filter((p) => p.category === "Side Dishes").length

  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar activePage="products" />
      <main className="flex-1 overflow-auto ml-44">
        <div className=" border-b-2 border-red-700 px-8 py-6">
        <h1 className="text-3xl font-bold text-red-700">Products</h1>
      </div>
        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Package className="w-8 h-8 text-red-700"/>} number={totalProducts} label="Total Products" />
            <StatCard icon={<Utensils className="w-8 h-8 text-red-700"/>} number={riceMealsCount} label="Rice Meals & Soup" />
            <StatCard icon={<Shell className="w-8 h-8 text-red-700"/>} number={rollsCount} label="Rolls" />
            <StatCard icon={<LeafyGreen className="w-8 h-8 text-red-700"/>} number={sideDishesCount} label="Side Dishes" />
          </div>
          <ProductsTable products={products} onProductsChange={setProducts} />
        </div>
      </main>
    </div>
  )
}
