import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from './components/sidebar'
import HomeTab from './components/HomeTab'
import RewardsTab from './components/RewardsTab'
import VouchersTab from './components/VouchersTab'
import NotificationsTab from './components/NotificationsTab'
import FeedbackTab from './components/FeedbackTab';
import FeedbackSection from './components/FeedbackSection';
import ProfilePage from './components/ProfilePage'
import { mockData } from './mockData'
import { PointsProvider } from './context/PointsContext'
import RewardsSection from './components/RewardsSection'

const Home = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');
    const [user, setUser] = useState(null);
    const [rewards, setRewards] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const tabComponents = useMemo(() => ({
        home: HomeTab,
        rewards: RewardsTab,
        vouchers: VouchersTab,
        notifications: NotificationsTab,
        feedback: FeedbackSection,
        profile: ProfilePage
    }), []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            
            // TEMPORARY: Use mock data for development
            // Uncomment below to use real API when backend is ready
            if (!token) {
                // Use mock data for development
                setUser(mockData.user);
                setRewards(mockData.rewards);
                setVouchers(mockData.vouchers);
                setNotifications(mockData.notifications);
                return;
            }
            
            const response = await axios.get('http://localhost:8080/customer/home', {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            });
            if (response.status !== 201) {
                // Use mock data if API fails
                setUser(mockData.user);
                setRewards(mockData.rewards);
                setVouchers(mockData.vouchers);
                setNotifications(mockData.notifications);
                return;
            }
            setUser(response.data.user);
            console.log(response.data.user);
        } catch (err) {
            // Use mock data on error
            console.log('Using mock data for development:', err.message);
            setUser(mockData.user);
            setRewards(mockData.rewards);
            setVouchers(mockData.vouchers);
            setNotifications(mockData.notifications);
        }
    }

    const fetchRewards = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setRewards(mockData.rewards);
                return;
            }
            const response = await axios.get('http://localhost:8080/customer/rewards', {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            });
            if (response.status === 200 || response.status === 201) {
                setRewards(response.data.rewards || response.data || []);
                console.log(response.data.rewards);
            } else {
                setRewards(mockData.rewards);
            }
        } catch (err) {
            // Use mock data if API fails
            console.log('Using mock rewards data:', err.message);
            setRewards(mockData.rewards);
        }
    }

    const fetchVouchers = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return setVouchers(mockData.vouchers);

            const res = await axios.get('http://localhost:8080/customer/vouchers', {
            headers: { Authorization: `Bearer ${token}` }
            });
            setVouchers(res.data.vouchers || res.data || []);
        } catch (err) {
            console.log('Using mock vouchers data:', err.message);
            setVouchers(mockData.vouchers);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchUser();
        fetchRewards();
        fetchVouchers();
    }, [navigate]);

    const ActiveContent = tabComponents[activeTab] || HomeTab;

    const updateUserPoints = (newPoints) => {
        setUser(prev => prev ? { ...prev, points: newPoints } : null);
    };

    return (
        <PointsProvider 
            points={user?.points || 0} 
            updateUserPoints={updateUserPoints}
            useMockData={true}
        >
            <div className='flex h-screen overflow-hidden bg-[#F2EAD3]'>
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} userProfile={user} onProfileClick={() => setActiveTab('profile')} onLogout={handleLogout} />
                <main className='flex-1 p-3 overflow-y-auto bg-[#F2EAD3]'>
                    {activeTab === 'home' ? (
                        <HomeTab user={user} rewards={rewards} />
                    ) : activeTab === 'rewards' ? (
                        <RewardsTab rewards={rewards} user={user} />
                    ) : activeTab === 'vouchers' ? (
                        <VouchersTab rewards={rewards} user={user} />
                    ) : activeTab === 'notifications' ? (
                        <NotificationsTab notifications={notifications} user={user} />
                    ) : activeTab === 'profile' ? (
                        <ProfilePage user={user} />
                    ) : activeTab === 'feedback' ? (
                        <FeedbackSection user={user} />
                    ) : (
                        <ActiveContent user={user} />
                    )}
                </main>
            </div>
        </PointsProvider>
    )
}

export default Home