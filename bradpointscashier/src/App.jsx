import { useState } from 'react'
import Header from './components/Header';
import BackgroundImage from './components/BackgroundImage';
import LoginCard from './components/LoginCard';
import RestaurantOrderingUI from './components/SubmitOrder';
import RedeemVoucher from './components/RedeemVoucher';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="min-h-screen flex flex-col">
      {page !== 'submitOrder' && <Header />}

      <div className="flex-1 relative flex items-center justify-center">
        {page !== 'submitOrder' && <BackgroundImage />}
        {page === 'home' && (
          <LoginCard onSubmitOrder={() => setPage('submitOrder')} onRedeem={() => setPage('redeemVoucher')} />
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

export default App;