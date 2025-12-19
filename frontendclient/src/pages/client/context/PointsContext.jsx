import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios"

const PointsContext = createContext();

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};

export const PointsProvider = ({ children, points, updateUserPoints, /*useMockData = false*/ }) => {
  const [currentPoints, setCurrentPoints] = useState(points || 0);
  console.log('PointsProvider initialized with points:', points);
  console.log('currentPoints state:', currentPoints);

  useEffect(() => {
    console.log('Points prop changed to:', points);
    if (points !== undefined && points !== null) {
      setCurrentPoints(Number(points));
    }
  }, [points]);

  const [redeemedRewards, setRedeemedRewards] = useState(new Set());
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/customer/getnotifs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data?.notifications || [];
        const formatted = data.map(n => ({
          id: n.id,
          type: n.type,
          title: n.title,
          message: n.message,
          timestamp: n.date_created,
          read: false
        }));
        setNotifications(formatted);
      } catch (err) {
        console.error('Failed to fetch notifications:', err);
      }
    };
    fetchNotifications();
  }, []);

  // Load redeemed rewards from localStorage for persistence
  // useEffect(() => {
  //   if (useMockData) {
  //     const savedRedeemed = localStorage.getItem('redeemedRewards');
  //     if (savedRedeemed) {
  //       try {
  //         const redeemed = JSON.parse(savedRedeemed);
  //         setRedeemedRewards(new Set(redeemed));
  //       } catch (err) {
  //         console.error('Error loading redeemed rewards:', err);
  //       }
  //     }
  //   }
  // }, [useMockData]);

  // Save redeemed rewards to localStorage
  // const saveRedeemedRewards = (rewardIds) => {
  //   if (useMockData) {
  //     localStorage.setItem('redeemedRewards', JSON.stringify(Array.from(rewardIds)));
  //   }
  // };

  // LOCAL/MOCK DATA VERSION
  // const redeemRewardLocal = (reward) => {
  //   // Check if user has enough points
  //   if (currentPoints < reward.reward_points) {
  //     alert(`You need ${reward.reward_points} points to redeem this reward. You currently have ${currentPoints} points.`);
  //     return false;
  //   }

  //   // Check if reward was already redeemed
  //   if (redeemedRewards.has(reward.id)) {
  //     alert('You have already redeemed this reward!');
  //     return false;
  //   }

  //   // Deduct points and mark reward as redeemed
  //   const newPoints = currentPoints - reward.reward_points;
  //   setCurrentPoints(newPoints);
  //   const newRedeemed = new Set([...redeemedRewards, reward.id]);
  //   setRedeemedRewards(newRedeemed);
  //   saveRedeemedRewards(newRedeemed);
    
  //   // Update user points if callback provided
  //   if (updateUserPoints) {
  //     updateUserPoints(newPoints);
  //   }
    
  //   // Create notification for reward redemption
  //   const newNotification = {
  //     id: Date.now(),
  //     type: 'redemption',
  //     title: 'Reward Redeemed!',
  //     message: `You successfully redeemed "${reward.reward_name}" for ${reward.reward_points} points.`,
  //     timestamp: new Date().toISOString(),
  //     read: false
  //   };
    
  //   setNotifications((prev) => [newNotification, ...prev]);
    
  //   alert(`Congratulations! You've successfully redeemed "${reward.reward_name}" for ${reward.reward_points} points.`);
  //   return true;
  // };

  // BACKEND VERSION (for when backend is ready)
  const redeemReward = async (reward) => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/customer/redeemreward', {
        rewardname: reward.reward_name,
        rewardpoints: reward.reward_points ?? reward.points,
        rewardid: reward.id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data;
      if (data.success) {
        const newPoints = Number(data.points);
        setCurrentPoints(newPoints);
        if (updateUserPoints) updateUserPoints(newPoints);

        setRedeemedRewards(prev => new Set([...prev, reward.id]));

        setNotifications(prev => [
          ...prev,
          {
            id: Date.now(),
            type: 'redemption',
            title: 'Reward Redeemed!',
            message: data.message,
            timestamp: new Date().toISOString(),
            read: false,
          },
        ])
        alert(data.message);
        return true;
      } else {
        alert(data.message);
        return false;
      }
    } catch (err) {
      console.error('Redeem error:', err);
      alert('Failed to redeem reward.');
      return false;
    }



    // const response = await fetch("http://localhost/BradPoints/php-backend/redeem-reward.php", {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     avail_reward_name: reward.reward_name,
    //     avail_reward_points: reward.reward_points,
    //     avail_reward_id: reward.id,
    //   }),
    // });
    // const data = await response.json();
    // if (data.success) {
    //   setCurrentPoints(Number(data.points));
    //   if (updateUserPoints) updateUserPoints(Number(data.points));
    //   setNotifications((prev) => [
    //     ...prev,
    //     {
    //       id: Date.now(),
    //       type: 'redemption',
    //       title: 'Reward Redeemed!',
    //       message: data.message,
    //       timestamp: new Date().toISOString(),
    //       read: false,
    //     },
    //   ]);
    //   alert(data.message);
    //   return true;
    // } else {
    //   alert(data.message);
    //   return false;
    // }
  };

  // const redeemReward = useMockData ? redeemRewardLocal : redeemRewardBackend;

  // // LOCAL/MOCK DATA VERSION
  // const isRewardRedeemedLocal = (rewardId) => {
  //   return redeemedRewards.has(rewardId);
  // };

  // BACKEND VERSION
  const isRewardRedeemed = async (rewardId) => {

    const token = localStorage.getItem('token');
    const {data} = await axios.post('http://localhost:8080/customer/checkredeem', {
      rewardId: Number(rewardId)
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return Boolean(data?.redeemed);

    // const response = await fetch("http://localhost/BradPoints/php-backend/check-redeem.php", {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     avail_reward_id: rewardId
    //   }),
    // });
    // const data = await response.json();
    // return data.redeemed;
  };

  // const isRewardRedeemed = useMockData 
  //   ? (rewardId) => Promise.resolve(isRewardRedeemedLocal(rewardId))
  //   : isRewardRedeemedBackend;

  const isRewardClaimed = async (rewardId) => {
    // if (useMockData) {
    //   return redeemedRewards.has(rewardId);
    // }
    
    const token = localStorage.getItem('token');
    const {data} = await axios.post('http://localhost:8080/customer/checkclaim', {
      rewardId
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data.claimed;

    /*const response = await fetch("http://localhost/BradPoints/php-backend/check-claim.php", {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        reward_id: rewardId
      }),
    });
    const data = await response.json();
    return data.claimed;*/
  };

  const canRedeemReward = (pointsRequired) => {
    const result = currentPoints >= pointsRequired;
    console.log(`canRedeemReward check: currentPoints=${currentPoints}, required=${pointsRequired}, canRedeem=${result}`);
    return result;
  };

  const value = {
    currentPoints,
    setCurrentPoints,
    redeemReward,
    isRewardRedeemed,
    isRewardClaimed,
    canRedeemReward,
    redeemedRewards,
    notifications,
    setNotifications
  };

  return (
    <PointsContext.Provider value={value}>
      {children}
    </PointsContext.Provider>
  );
};

/* const redeemReward = (rewardId, pointsRequired) => {
    // Check if user has enough points
    if (currentPoints < pointsRequired) {
      alert(`You need ${pointsRequired} points to redeem this reward. You currently have ${currentPoints} points.`);
      return false;
    }

    // Check if reward was already redeemed
    if (redeemedRewards.has(rewardId)) {
      alert('You have already redeemed this reward!');
      return false;
    }

    // Deduct points and mark reward as redeemed
    setCurrentPoints(prev => prev - pointsRequired);
    setRedeemedRewards(prev => new Set([...prev, rewardId]));
    
    // Create notification for reward redemption
    const newNotification = {
      id: Date.now(),
      type: 'redemption',
      title: 'Reward Redeemed!',
      message: `You successfully redeemed a reward for ${pointsRequired} points.`,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    alert(`Congratulations! You've successfully redeemed the reward for ${pointsRequired} points.`);
    return true;
  }; */

  /*{
      id: 1,
      type: 'redemption',
      title: 'Reward Redeemed!',
      message: 'You successfully redeemed FREEDRINK for 25 points.',
      timestamp: '2024-12-15T10:30:00',
      read: false
    },
    {
      id: 2,
      type: 'new_reward',
      title: 'New Reward Available!',
      message: 'PARTYPACK200 is now available! Get Php 200 off group orders of 4+ people.',
      timestamp: '2024-12-14T15:45:00',
      read: false
    }*/