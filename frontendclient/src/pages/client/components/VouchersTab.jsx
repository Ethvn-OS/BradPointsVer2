import React, { useState, useEffect } from 'react';
import Header from './header';
import { usePoints } from '../context/PointsContext';

const VouchersTab = ({ user, rewards = [] }) => {
  const { isRewardRedeemed, isRewardClaimed } = usePoints();
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redeemedVouchers, setRedeemedVouchers] = useState([]);
  const [claimedStatuses, setClaimedStatuses] = useState([]);
  const [loading, setLoading] = useState(false);

  // const redeemedVouchers = vouchers.filter(voucher => voucher.status === 'used' || voucher.redeemed_at);

  const allRewards = rewards || [];

  useEffect(() => {
    const fetchRedeemedVouchers = async () => {
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      console.log('allRewards length:', allRewards.length);
      if (!token || allRewards.length === 0) return;

      const redeemed = [];
      const claims = {};

      for (const reward of allRewards) {
        try {
          const isRedeemed = await isRewardRedeemed(Number(reward.id));
          console.log(`  -> isRedeemed: ${isRedeemed}`);
          if (isRedeemed) {
            redeemed.push(reward);
            const isClaimed = await isRewardClaimed(Number(reward.id));
            claims[Number(reward.id)] = isClaimed;
          }
        } catch (err) {
          console.error(`Error checking reward ${reward.id}:`, err);
        }
      }
      
      console.log(redeemed);
      setRedeemedVouchers(redeemed);
      setClaimedStatuses(claims);
    };

    fetchRedeemedVouchers();
  }, [allRewards]);

  console.log('Redeemed Vouchers:', redeemedVouchers);

  console.log(rewards);

  const openModal = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  return (
    <>
      <div className='px-2 flex flex-col gap-4'>
        <Header user={user} />

        <div className='w-full flex flex-col gap-2 items-center justify-center mt-4'>
          <h2 className="text-br-red font-extrabold text-2xl">Redeemed Vouchers</h2>
          <p className='text-sm text-gray-600'>Here are all the vouchers you have redeemed with your BradPoints!</p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 max-w-3xl">
            <p className="text-sm text-yellow-800">
              <strong>Reminder:</strong> You have redeemed these vouchers, but you still need to claim your rewards in-store. Please claim your reward soon!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {redeemedVouchers.length === 0 ? (
            <div className="col-span-full text-center text-br-red text-xl py-12">
              You haven't redeemed any vouchers yet.
            </div>
          ) : (
            redeemedVouchers.map((voucher) => {
              // const isRedeemed = voucher.status === 'used';
              
              return (
                <div
                  key={voucher.id}
                  onClick={() => openModal(voucher)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-row h-48 cursor-pointer" style={{ 
                  borderLeft: `8px solid ${voucher.reward_color || '#EA7300'}`
                  }}
                >
                  {/* Left Section - Colored with Image and Points */}
                  <div 
                    className="relative w-2/6 flex flex-col items-center justify-center overflow-hidden"
                    style={{ backgroundColor: voucher.reward_color || '#EA7300' }}
                  >
                    {voucher.reward_image ? (
                      <img 
                        src={voucher.reward_image} 
                        alt={voucher.reward_name}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        style={{ opacity: 0.3 }}
                        onError={(e) => {
                          console.error('Image failed to load:', voucher.reward_image);
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="relative z-10 flex flex-col items-center justify-center text-white drop-shadow-lg">
                      <span className="text-4xl font-bold leading-none text-shadow-lg">{voucher.reward_points}</span>
                      <span className="text-sm font-medium mt-1">points</span>
                    </div>
                  </div>

                  {/* Right Section - White with Content */}
                  <div className="flex-1 flex flex-col justify-between p-5">
                    <div>
                      <h3 className="text-xl font-extrabold mb-2" style={{ color: voucher.reward_color || '#EA7300' }}>
                        {voucher.reward_name}
                      </h3>
                      <div className="w-full h-px bg-gray-200 mb-3"></div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {voucher.reward_desc || 'No description available.'}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-fit py-2 px-4 rounded-lg font-bold text-white text-xs bg-gray-400 cursor-not-allowed self-center"
                        disabled
                      >
                        REDEEMED
                      </button>
                      <span className="text-xs font-semibold text-center" style={{ color: claimedStatuses[voucher.id] ? '#059669' : '#DC2626' }}>
                        {claimedStatuses[voucher.id] ? 'CLAIMED REWARD' : 'UNCLAIMED REWARD'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

       
      </div>

      {isModalOpen && selectedVoucher && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-br-red">{selectedVoucher.reward_name}</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">{selectedVoucher.reward_desc || 'No description available.'}</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-sm text-yellow-800 font-semibold">
                  {claimedStatuses[selectedVoucher.id]
                    ? 'This reward has been claimed!' 
                    : 'This voucher is redeemed, but the reward has not yet been claimed. Please claim your reward in-store soon!'}
                </p>
              </div>
              <p className="text-lg font-semibold text-br-red">Points Required: {selectedVoucher.reward_points}</p>
              {selectedVoucher.voucher_code && (
                <p className="text-sm text-gray-600 mt-2">Code: {/*selectedVoucher.voucher_code*/}</p>
              )}
            </div>
            <div className="p-6 border-t flex justify-end">
              <button 
                className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed" 
                disabled
              >
                {claimedStatuses[selectedVoucher.id]? 'Already Claimed' : 'Redeemed - Claim in Store'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VouchersTab;