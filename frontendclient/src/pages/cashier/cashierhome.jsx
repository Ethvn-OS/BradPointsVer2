import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// imported components
import Header from './components/Header';
import BackgroundImage from './components/BackgroundImage';
import LoginCard from './components/LoginCard';
import RestaurantOrderingUI from './components/SubmitOrder';
import RedeemVoucher from './components/RedeemVoucher';

const CashierHome = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState('home');

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/auth/cashierhome', {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            });2
            if (response.status !== 201) {
                navigate('/login');
            }
            console.log(response);
        } catch (err) {
            navigate('/login');
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    // here i add ang imong related code yza

    return (
        <div className="min-h-screen flex flex-col">
            {page !== 'submitOrder' && <Header />}

            <div className="flex-1 relative flex items-center justify-center">
                {page !== 'submitOrder' && <BackgroundImage />}
                {page === 'home' && (
                    <LoginCard 
                        onSubmitOrder={() => setPage('submitOrder')} 
                        onRedeem={() => setPage('redeemVoucher')} 
                    />
                )}
                {page === 'submitOrder' && (
                    <RestaurantOrderingUI onGoBack={() => setPage('home')} />
                )}
                {page === 'redeemVoucher' && (
                    <RedeemVoucher onGoBack={() => setPage('home')} />
                )}
            </div>
        </div>
    );
}

export default CashierHome