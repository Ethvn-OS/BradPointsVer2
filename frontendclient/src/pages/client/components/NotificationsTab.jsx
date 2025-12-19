import React, { useState } from 'react';
import Header from './header';
import { mockNotifications } from '../mockData';
import { usePoints } from '../context/PointsContext';

const NotificationsTab = ({ user }) => {
  const { notifications, setNotifications } = usePoints();

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div>
      <div className="px-2 flex flex-col gap-4">
        <Header user={user} />

        <div className='w-full flex flex-col gap-2 items-center justify-center mt-4'>
          <h2 className="text-br-red font-extrabold text-2xl">Notifications</h2>
          <p className='text-sm text-gray-600'>Stay updated with your latest rewards and announcements</p>
        </div>

          <div className="relative mb-4 text-center">
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="rounded-lg bg-[#a22221] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#8B0000]"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications */}
          <div className="mb-10 flex flex-col gap-4 mx-20">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-gray-600">
                <p className="mb-2 text-xl font-bold text-[#a22221]">
                  No notifications yet
                </p>
                <p className="leading-relaxed text-sm">
                  You'll see notifications here when you redeem rewards or when
                  new rewards become available.
                </p>
              </div>
            ) : (
              [...notifications].reverse().map(notification => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`relative cursor-pointer rounded-xl bg-white p-5 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg
                    ${!notification.read
                      ? 'border-l-4 border-[#a22221] bg-[#fefefe]'
                      : 'border-l-4 border-transparent'
                    }`}
                >
                  <div className="mb-4 text-3xl">
                    {notification.type === 'redemption' ? '🎉' : '🎊'}
                  </div>

                  <div>
                    <div className="mb-2 flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                      <h3 className="text-lg font-bold text-[#a22221]">
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>

                    <p className="text-gray-800 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>

                  {!notification.read && (
                    <span className="absolute right-5 top-5 h-2 w-2 rounded-full bg-[#a22221]" />
                  )}
                </div>
              ))
            )}
          </div>
       </div>
    </div>
  );
};

export default NotificationsTab;
