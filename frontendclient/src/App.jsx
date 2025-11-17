import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/client/home';
import CashierHome from './pages/cashier/cashierhome';
import AdminDash from './pages/admin/dashboard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/home' element={<Home />} />
      <Route path='/cashierhome' element={<CashierHome />} />
      <Route path='/dashboard' element={<AdminDash />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;