import React from 'react'

const Header = ({ user }) => {
  const userName = user?.user_name || user?.username || 'Guest';
  const userId = user?.user_id || user?.id || '';

  return (
    <div className='w-full bg-white rounded-md flex flex-col items-start justify-center left-0 py-8 px-6 gap-2'>
        <h1 className='text-2xl font-bold text-br-red'>
          Welcome back, {userName}!
        </h1>
        <p className='text-sm text-gray-600'>
          User ID: {userId}
        </p>
    </div>
  )
}

export default Header