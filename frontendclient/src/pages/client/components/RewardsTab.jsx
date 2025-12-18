import React, { useState, useEffect } from 'react'
import Header from './header'
import { usePoints } from '../context/PointsContext'

const RewardsTab = ({ user, rewards = [] }) => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { redeemReward, isRewardRedeemed, canRedeemReward } = usePoints();
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [checkingRedeemed, setCheckingRedeemed] = useState(true);
  const [redeemedRewards, setRedeemedRewards] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Check redemption status for all rewards on mount
  useEffect(() => {
    const checkAllRewards = async () => {
      const redeemed = new Set();
      for (const reward of rewards) {
        const redeemedStatus = await isRewardRedeemed(reward.id);
        if (redeemedStatus) {
          redeemed.add(reward.id);
        }
      }
      setRedeemedRewards(redeemed);
    };
    if (rewards.length > 0) {
      checkAllRewards();
    }
  }, [rewards, isRewardRedeemed]);

  const openModal = async (reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
    setCheckingRedeemed(true);
    const redeemed = await isRewardRedeemed(reward.id);
    setIsRedeemed(redeemed);
    setCheckingRedeemed(false);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReward(null);
  };

  const claimReward = () => {
    const success = redeemReward(selectedReward);
    if (success) {
      closeModal();
    }
  };

  const categories = ['All', 'Drinks', 'Side Dishes', 'Main Meals', 'Discounts', 'Combo Meals'];

  const filteredRewards = selectedCategory === 'All' 
    ? rewards 
    : rewards.filter(reward => reward.reward_category === selectedCategory);

  return (
    <>
      <div className='px-2 flex flex-col gap-4'>
        <Header user={user} />

        <div className='w-full flex flex-col gap-2 items-center justify-center mt-4'>
          <h2 className="text-br-red font-extrabold text-2xl">Available Rewards</h2>
          <p className='text-sm text-gray-600'>Browse through all the amazing rewards you can redeem with your Bradpoints!</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center my-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm ${
              selectedCategory === category
                ? 'bg-br-red text-white shadow-lg'
                : 'bg-white text-br-red border-2 border-gray-200 hover:border-red-300 hover:bg-red-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {filteredRewards.map((reward) => {
              const rewardPoints = reward.reward_points || reward.points;
              const canRedeem = canRedeemReward(rewardPoints);
              const alreadyRedeemed = redeemedRewards.has(reward.id);
              
              // Debug: Log image info
              console.log('Reward:', reward.reward_name, 'Image:', reward.reward_image, 'Type:', typeof reward.reward_image);
              
              return (
                <div
                  key={reward.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-row h-44"
                >
                  {/* Left Section - Colored with Image and Points */}
                  <div 
                    className="relative w-2/6 flex flex-col items-center justify-center overflow-hidden"
                    style={{ backgroundColor: reward.reward_color || '#EA7300' }}
                  >
                    {reward.reward_image ? (
                      <img 
                        src={reward.reward_image} 
                        alt={reward.reward_name}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        style={{ opacity: 0.6, filter: 'blur(4px)' }}
                        onError={(e) => {
                          console.error('❌ Image failed to load:', reward.reward_image, 'Type:', typeof reward.reward_image, 'for reward:', reward.reward_name);
                          e.target.style.display = 'none';
                        }}
                        onLoad={(e) => {
                          console.log('✅ Image loaded successfully:', reward.reward_name, 'from:', reward.reward_image, 'Actual src:', e.target.src);
                        }}
                      />
                    ) : null}
                    <div className="relative z-10 flex flex-col items-center justify-center text-white drop-shadow-lg">
                      <span className="text-4xl font-bold leading-none">{reward.reward_points || reward.points}</span>
                      <span className="text-sm font-medium mt-1">points</span>
                    </div>
                  </div>

                  {/* Right Section - White with Content */}
                  <div className="flex-1 flex flex-col justify-between p-5">
                    <div>
                      <h3 className="text-xl font-extrabold mb-2" style={{ color: reward.reward_color || '#EA7300' }}>
                        {reward.reward_name}
                      </h3>
                      <div className="w-full h-px bg-gray-200 mb-3"></div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {reward.reward_desc || reward.description || 'No description available.'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (alreadyRedeemed) {
                          alert('You have already redeemed this reward!');
                          return;
                        }
                        if (canRedeem) {
                          const success = redeemReward(reward);
                          if (success) {
                            setRedeemedRewards(prev => new Set([...prev, reward.id]));
                          }
                        } else {
                          openModal(reward);
                        }
                      }}
                      className={`w-fit py-2 px-4 rounded-lg font-bold text-white text-xs transition-colors self-center ${
                        alreadyRedeemed || !canRedeem
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'hover:opacity-90 cursor-pointer'
                      }`}
                      style={{ 
                        backgroundColor: (!alreadyRedeemed && canRedeem) ? (reward.reward_color || '#EA7300') : undefined
                      }}
                      disabled={alreadyRedeemed || !canRedeem}
                    >
                      {alreadyRedeemed ? 'ALREADY REDEEMED' : canRedeem ? 'REDEEM' : 'INSUFFICIENT POINTS'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
      </div>

      {isModalOpen && selectedReward && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-br-red">{selectedReward.reward_name}</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">{selectedReward.description || selectedReward.reward_desc || 'No description available.'}</p>
              <p className="text-lg font-semibold text-br-red">Points Required: {selectedReward.reward_points || selectedReward.points}</p>
            </div>
            <div className="p-6 border-t flex justify-end">
              {checkingRedeemed ? (
                <button className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed" disabled>
                  Checking...
                </button>
              ) : isRedeemed ? (
                <button className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed" disabled>
                  Already Redeemed
                </button>
              ) : !canRedeemReward(selectedReward.reward_points || selectedReward.points) ? (
                <button className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed" disabled>
                  Insufficient Points
                </button>
              ) : (
                <button 
                  className="px-6 py-2 bg-br-red text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  onClick={claimReward}
                >
                  Claim Reward
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RewardsTab

