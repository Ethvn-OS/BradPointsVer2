import React from 'react'
import logo from '../../../assets/images/BradpointsLogo.png'
import { GrHomeRounded } from "react-icons/gr";
import { LuGift } from "react-icons/lu";
import { LuTicket } from "react-icons/lu";
import { RiNotification2Line } from "react-icons/ri";
import { RiFeedbackLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ activeTab = 'home', onTabChange = () => {}, userProfile = {}, onProfileClick = () => {}, onLogout = () => {} }) => {

    const tabs = [
        { id: 'home', name: 'Home', icon: GrHomeRounded },
        { id: 'rewards', name: 'Rewards', icon: LuGift },
        { id: 'vouchers', name: 'Vouchers', icon: LuTicket },
        { id: 'notifications', name: 'Notifications', icon: RiNotification2Line },
        { id: 'feedback', name: 'Feedback', icon: RiFeedbackLine },
    ];

    return (
        <>
            <div className='bg-br-red w-64 h-screen flex flex-col shadow-lg justify-start items-center'>

                {/* logo and name */}
                <div className='w-full text-white'>
                    <div className='flex flex-row items-center gap-2 px-8 py-6'>
                        <img src={logo} alt="Bradpoints" className='w-12'/>
                        <p className='text-xl font-extrabold tracking-wide'>BradPoints</p>
                    </div>
                    <hr className='border-0 border-t-2 w-full border-t-orange-300 opacity-30' />
                </div>
                
                {/* tabs */}
                <div className='w-full flex flex-col mt-12'>
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`w-full flex items-center space-x-3 text-xs px-8 py-5 transition-colors ${
                            activeTab === tab.id
                                ? 'bg-red-800 text-white'
                                : 'text-red-100 hover:bg-red-400'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{tab.name}</span>
                        </button>
                        );
                    })}
                </div>

                {/* profile and logout */}
                <div className='w-full text-white text-xs mt-auto'>
                    <hr className='w-full border-t-2 border-t-orange-300 opacity-30'/>
                    <div className='flex flex-row justify-between items-center px-8 py-4'>
                        {/* Profile Section - Clickable */}
                        <button 
                            onClick={onProfileClick}
                            className='flex flex-row gap-3 items-center hover:opacity-80 transition-opacity'
                        >
                            <img 
                                src={userProfile?.profilePicture || 'https://via.placeholder.com/40'}
                                alt="Profile" 
                                className='w-8 h-8 rounded-full object-cover border-2 border-orange-300'
                            />
                            <span className='font-medium text-xs'>{userProfile?.user_name || 'User Name'}</span>
                        </button>

                        {/* Logout Icon */}
                        <button 
                            onClick={onLogout}
                            className='p-2 hover:opacity-80 rounded-lg transition-colors'
                            title="Logout"
                        >
                            <FiLogOut className='w-5 h-5'/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar