import React, { useEffect, useState } from 'react';

const PointsSection = ({ user, rewards = [] }) => {
  const currentPoints = user?.points || 0;

  const [nextReward, setNextReward] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setNextReward(null);
      return;
    }

    const getUnredeemed = () => {
      setLoading(true);
      const claimable = [];
      const upcoming = [];

      // If no rewards, show no next reward
      if (!rewards || rewards.length === 0) {
        setNextReward(null);
        setLoading(false);
        return;
      }

      for (const reward of rewards) {
        // For now, we'll assume rewards aren't redeemed if they're in the list
        // You can add redemption checking logic later
        const rewardPoints = reward.reward_points || reward.points || 0;
        if (currentPoints >= rewardPoints) {
          claimable.push(reward);
        } else {
          upcoming.push(reward);
        }
      }

      // Sort each list
      claimable.sort((a, b) => (a.reward_points || a.points || 0) - (b.reward_points || b.points || 0));
      upcoming.sort((a, b) => (a.reward_points || a.points || 0) - (b.reward_points || b.points || 0));

      // Decide what to show - prioritize upcoming rewards (ones not yet reached)
      setNextReward(upcoming[0] || claimable[0] || null);
      setLoading(false);
    };

    getUnredeemed();
  }, [rewards, currentPoints, user]);

  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">Loading next reward...</div>
      </div>
    );
  }

  const pointsNeeded = nextReward ? (nextReward.reward_points || nextReward.points || 0) : currentPoints;
  const pointsRemaining = nextReward ? Math.max(0, pointsNeeded - currentPoints) : 0;
  const progressPercentage = nextReward ? Math.min(100, (currentPoints / pointsNeeded) * 100) : 100;

  return (
    <div className="w-full flex flex-col justify-center items-start gap-6">
      <h2 className='text-br-red font-extrabold text-xl'>Points</h2>
      <div className='w-full flex flex-row gap-3'>
        {/* Points Display Card */}
        <div className='bg-br-red rounded-lg flex flex-col justify-center items-center px-10 py-10 min-w-[200px]'>
          <h2 className="text-4xl font-bold text-white">{currentPoints.toLocaleString()}</h2>
          <p className="text-xs text-white/80 mt-1">Your Current Points</p>
        </div>
        
        {/* Progress Section Card */}
        <div className='flex-1 bg-white rounded-lg shadow-md px-6 py-6 items-center justify-center'>
          <div className="w-full h-full flex flex-row items-center justify-center gap-4">
            {/* Message */}
            <div className="flex justify-center items-center max-w-100">
              <p className="text-br-red text-sm">
                {nextReward 
                  ? "Purchase more from Braddex in order to avail your next awesome reward!" 
                  : "You've reached all available rewards! Great job!"}
              </p>
            </div>

            {/* Divider */}
            <div className="h-full w-px bg-br-red py-2 opacity-55"></div>

            {/* Progress Bar Section */}
            <div className="w-full flex flex-col justify-center items-center px-2">
              <p className="text-br-red font-bold italic text-sm mb-3">
                {nextReward 
                  ? `${pointsRemaining.toLocaleString()} more points until you can redeem your next reward!` 
                  : "You've unlocked all rewards!"}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-br-orange h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              {nextReward && (
                <p className="text-xs text-gray-500 mt-2">
                  Next reward: {nextReward.reward_name || nextReward.name} ({pointsNeeded.toLocaleString()} points)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsSection;
