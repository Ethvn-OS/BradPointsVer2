import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

function RedeemVoucher({ onGoBack }) {
  const [voucherCode, setVoucherCode] = useState('');
  const [confirmationMode, setConfirmationMode] = useState(false);
  const [claimSuccessMode, setClaimSuccessMode] = useState(false);

  const handleSubmit = () => {
    setConfirmationMode(true);
  };

  const handleClaim = () => {
    console.log('Voucher claimed:', voucherCode);
    // In a real application, you would send voucherCode to a backend for processing.
    // Assuming successful claim for now:
    setClaimSuccessMode(true);
    setConfirmationMode(false); // Hide confirmation, show success
  };

  const handleBack = () => {
    setConfirmationMode(false);
  };

  return (
    <div className="relative z-10 bg-white rounded-lg shadow-lg ring-1 ring-red-600 p-8 w-full max-w-lg h-96">
      {/* Back arrow button */}
      <button
        onClick={onGoBack}
        className="absolute top-4 left-4 p-1 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Top middle icon placeholder */}
      <div className="flex justify-center mb-6 mt-2">
        <div className="w-9 h-9 flex items-center justify-center">
          <img src="/src/assets/voucherImg.png" alt="voucher icon" className="w-full h-full object-contain" />
        </div>
      </div>

      {!confirmationMode && !claimSuccessMode && (
        <>
          {/* Title */}
          <h2 className="text-2xl text-center text-red-600 font-semibold mb-8">
            Redeem Voucher
          </h2>

          {/* Voucher code input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Enter customer voucher code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </>
      )}

      {/* Submit button */}
      {!confirmationMode && !claimSuccessMode ? (
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-2 bg-red-700 text-white rounded font-semibold hover:bg-red-800 transition-colors"
          >
            Submit
          </button>
        </div>
      ) : confirmationMode ? (
        <div className="text-center">
          <h2 className="text-xl text-red-600 mb-2">
            Are you sure you want to redeem this voucher?
          </h2>
          <p className="italic text-gray-500 text-sm mb-10">
            Once vouchers are redeemed, they cannot be returned or exchanged.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleClaim}
              className="px-8 py-2 bg-red-700 text-white rounded font-semibold hover:bg-red-800 transition-colors"
            >
              Claim
            </button>
            <button
              onClick={handleBack}
              className="px-8 py-2 bg-gray-300 text-gray-800 rounded font-semibold hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl text-red-600 mb-2 font-bold">
            SUCCESS!
          </h2>
          <p className="italic text-gray-500 text-sm mb-10">
            Voucher {voucherCode} claimed by user {"USER_ID"}
          </p>
          <div className="flex justify-center">
            <button
              onClick={onGoBack}
              className="px-8 py-2 bg-red-700 text-white rounded font-semibold hover:bg-red-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RedeemVoucher;