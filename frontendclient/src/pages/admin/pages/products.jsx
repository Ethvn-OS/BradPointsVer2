import Sidebar from "../components/sidebar"
import StatCard from "../components/stat-card"
import ProductsTable from "../components/products-table"
import { Package, Utensils, Shell, LeafyGreen } from 'lucide-react'
import { useState, useEffect } from "react"
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

export const metadata = {
  title: "Products - Admin Dashboard",
  description: "Manage products and categories",
}

export default function ProductsPage() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [navigate])

  const [totalNumProducts, setTotalNumProducts] = useState(0);
  const [totalRice, setTotalRice] = useState(0);
  const [totalRolls, setTotalRolls] = useState(0);
  const [totalSide, setTotalSide] = useState(0);
  const [allProducts, setAllProducts] = useState([]);

  const numOfProducts = async () => {
    const response = await axios.get("http://localhost:8080/admin/countallprod");
    setTotalNumProducts(response.data.allprod);
    console.log(response.data.allprod);
  }

  const numRice = async () => {
    const response = await axios.get("http://localhost:8080/admin/countallrice");
    setTotalRice(response.data.allrice);
    console.log(response.data.allrice);
  }

  const numRolls = async () => {
    const response = await axios.get("http://localhost:8080/admin/countallrolls");
    setTotalRolls(response.data.allrolls);
    console.log(response.data.allrolls);
  }

  const numSide = async () => {
    const response = await axios.get("http://localhost:8080/admin/countallside");
    setTotalSide(response.data.allside);
    console.log(response.data.allside);
  }

  const allProd = async () => {
    const response = await axios.get("http://localhost:8080/admin/allproducts");
    setAllProducts(response.data.allprods);
    console.log(response.data.allprods);
  }

  useEffect(() => {
    numOfProducts();
  }, [])

  useEffect(() => {
    numRice();
  }, [])

  useEffect(() => {
    numRolls();
  }, [])

  useEffect(() => {
    numSide();
  }, [])

  useEffect(() => {
    allProd();
  }, [])

  const refreshAllData = async () => {
    await Promise.all([
      allProd(),
      numOfProducts(),
      numRice(),
      numRolls(),
      numSide()
    ]);
  }

  const totalProducts = allProducts.length
  const riceMealsCount = allProducts.filter((p) => p.category_id === 1).length
  const rollsCount = allProducts.filter((p) => p.category_id === 2).length
  const sideDishesCount = allProducts.filter((p) => p.category_id === 3).length

  return (
    <div className="flex h-screen bg-amber-50">
      <Sidebar activePage="products" />
      <main className="flex-1 overflow-auto ml-44">
        <div className=" border-b-2 border-red-700 px-8 py-6">
        <h1 className="text-3xl font-bold text-red-700">Products</h1>
      </div>
        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Package className="w-8 h-8 text-red-700"/>} number={`${totalNumProducts.count_prod}`} label="Total Products" />
            <StatCard icon={<Utensils className="w-8 h-8 text-red-700"/>} number={`${totalRice.count_rice}`} label="Rice Meals & Soup" />
            <StatCard icon={<Shell className="w-8 h-8 text-red-700"/>} number={`${totalRolls.count_rolls}`} label="Rolls" />
            <StatCard icon={<LeafyGreen className="w-8 h-8 text-red-700"/>} number={`${totalSide.count_side}`} label="Side Dishes" />
          </div>
          <ProductsTable products={allProducts} onProductsChange={refreshAllData} />
        </div>
      </main>
    </div>
  )
}


// DATA USED FOR TESTING
// const [products, setProducts] = useState(initialProducts)
/*const initialProducts = [
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
]*/