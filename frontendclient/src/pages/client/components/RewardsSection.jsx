import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePoints } from '../context/PointsContext';

const RewardsSection = ({ sectionRewards = [] }) => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { redeemReward, isRewardRedeemed, canRedeemReward } = usePoints();
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [checkingRedeemed, setCheckingRedeemed] = useState(true);

  const rewards = sectionRewards || [];

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

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-br-red font-extrabold text-xl">Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rewards.slice(0, 3).map((reward) => (
            <div
              key={reward.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => openModal(reward)}
              role="button"
              tabIndex={0}
              onKeyPress={e => { if (e.key === 'Enter') openModal(reward); }}
            >
              <div 
                className="h-30 flex items-center justify-center"
                style={{ backgroundColor: reward.reward_color || '#EA7300' }}
              >
                <h3 className="text-xl font-bold text-white text-center px-4 drop-shadow-lg">
                  {reward.reward_name}
                </h3>
              </div>
              <div className="p-4 text-center text-sm text-gray-600">
                Click to See More!
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button 
            className="px-6 py-2 bg-br-red text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            onClick={() => {
              // Navigate to rewards tab - you can update this to change activeTab if needed
              console.log('Navigate to rewards tab');
            }}
          >
            View All Rewards
          </button>
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
  );
};

export default RewardsSection;