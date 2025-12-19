import React from 'react'
import Header from './header'
import assortedImg from '../../../assets/images/assorted.jpg'
import PointsSection from './PointSection'
import RewardsSection from './RewardsSection'

const HomeTab = ({ user, rewards = [] }) => {
  return (
    <div className='px-2 flex flex-col gap-4'>

        <Header user={user} />

        <div className="bg-br-orange rounded-lg overflow-hidden relative h-64">
            <img
            src={ assortedImg }
            alt="Sunset"
            className="w-full h-full object-cover"
            style={{
                maskImage: 'linear-gradient(to right, black 20%, transparent 70%)',
                WebkitMaskImage: 'linear-gradient(to right, black 05%, transparent 70%)'
            }}
            />
            <div className="absolute inset-0 flex flex-col items-end justify-center pr-8">
                <h1 className="text-4xl font-bold text-white drop-shadow text-right">bradpoints.</h1>
                <p className="text-sm font-bold text-white/70 mt-2 text-right max-w-md">Bradpoints is your next one stop shop to all things Braddex. Check all your recent purchases, find your next big reward,and tell us all about your unique Braddex experience here!</p>
            </div>
      </div>

      <div className='w-full flex flex-col justify-center items-center mt-6'>
            <PointsSection user={user} rewards={rewards} />
      </div>

      <div className='w-full flex flex-col justify-center items-center mt-6'>
            <RewardsSection sectionRewards={rewards} />
      </div>

    </div>
  )
}

export default HomeTab

