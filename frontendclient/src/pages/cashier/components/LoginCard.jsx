import { useState } from 'react';
import cashierIcon from '../../../assets/images/cashierIcon.png';

function LoginCard({ onSubmitOrder, onRedeem }) {
  const [customerId, setCustomerId] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = () => {
    const trimmed = customerId.trim();
    // Validate: exactly 8 numeric digits
    if (!/^\d{8}$/.test(trimmed)) {
      setErrorMsg(`User ID (${trimmed}) not found. Please enter a valid ID.`);
      setShowActions(false);
      return;
    }
    setErrorMsg('');
    console.log('Customer ID submitted:', trimmed);
    setShowActions(true);
  };

  const handleGoBack = () => {
    setShowActions(false);
  };

  const handleOrderSubmit = () => {
    if (typeof onSubmitOrder === 'function') {
      onSubmitOrder();
      return;
    }
    console.log('Navigating to Submit Order page');
  };

  const handleRedeemVoucher = () => {
    if (typeof onRedeem === 'function') {
      onRedeem();
      return;
    }
    console.log('Navigating to Redeem Voucher page');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg ring-1 ring-bp-red p-8 w-full max-w-md relative z-10 h-auto sm:h-[500px] font-sans">
      {/* Back Button for the second section */}
      {showActions && (
        <button
          onClick={handleGoBack}
          className="absolute top-6 left-6 p-2 rounded-full text-gray-600 hover:bg-gray-200 transition-colors z-30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
        </button>
      )}

      {/* Always visible Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-4 rounded-full">
          <img src={cashierIcon} alt="cashier icon" className="w-12 h-12 object-contain" />
        </div>
      </div>

      {/* Always visible Welcome Message */}
      <h2 className="text-2xl text-center text-red-600 mb-6">
        Cashier Page
      </h2>

      {/* Always visible Input Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter customer ID number"
          value={customerId}
          onChange={(e) => {
            setCustomerId(e.target.value);
            if (errorMsg) setErrorMsg('');
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <p className={`text-xs mt-2 italic ${errorMsg ? 'text-red-600' : showActions ? 'text-bp-red' : 'text-gray-500'}`}>
          {errorMsg ? errorMsg : showActions ? 'ID number successfully retrieved!' : 'ID number must be 8 digits long'}
        </p>
      </div>

      {!showActions ? (
        // Submit Button - only when !showActions
        <button
          onClick={handleSubmit}
          className="w-full bg-bp-red text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors"
        >
          Submit
        </button>
      ) : (
        // Action Buttons section - only when showActions
        <div className="flex flex-col items-center justify-center pt-4">
          <h2 className="text-sm text-center text-gray-800 mb-6">
            What would you like to do next?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={handleOrderSubmit}
              className="flex-1 bg-bp-red text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors flex flex-col items-center justify-center space-y-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h-.75a1.125 1.125 0 01-1.125-1.125V11.25m17.25 0h-3.584a6 6 0 01-.145.334L17.25 12m4.5-2.75V15.75m0 0v2.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-2.5m17.25 0a2.25 2.25 0 00-2.25-2.25H5.25a2.25 2.25 0 00-2.25 2.25m17.25 0h-3.584a6 6 0 01-.145.334L17.25 12m4.5-2.75v.25M4.5 9H9m0-.75a3 3 0 013-3h.211a3 3 0 012.875 1.764" />
              </svg>
              SUBMIT ORDER
            </button>
            <button
              onClick={handleRedeemVoucher}
              className="flex-1 bg-bp-red text-white py-3 rounded-md font-semibold hover:bg-red-700 transition-colors flex flex-col items-center justify-center space-y-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
              </svg>
              REDEEM VOUCHER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginCard;