import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/client/home';
import CashierHome from './pages/cashier/cashierhome';
import AdminDash from './pages/admin/pages/dashboard';
import UsersPage from './pages/admin/pages/users';
import ProductsPage from './pages/admin/pages/products';
import RewardsPage from './pages/admin/pages/rewards';
import FeedbackPage from './pages/admin/pages/feedback'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/cashierhome' element={<CashierHome />} />
      <Route path='/dashboard' element={<AdminDash />} />
      <Route path='/users' element={<UsersPage />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/rewards' element={<RewardsPage />} />
      <Route path='/feedback' element={<FeedbackPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      

    </Routes>
  );
}

export default App;