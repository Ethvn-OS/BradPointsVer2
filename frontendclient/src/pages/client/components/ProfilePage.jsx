import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from './header';

const ProfilePage = ({ user, onUserUpdate }) => {
  const [userData, setUserData] = useState(user);
  const [formData, setFormData] = useState(user);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    setUserData({ ...formData });
    // Call parent component's update function if provided
    if (onUserUpdate) {
      onUserUpdate(formData);
    }
    alert('Profile updated successfully!');
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          profilePicture: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate letter avatar
  const getInitial = () => {
    return userData.user_name ? userData.user_name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className='px-2 flex flex-col gap-4'>
      <Header user={userData} />

      <h2 className='text-br-red font-extrabold text-xl ml-50 mt-4'>Edit Profile</h2>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-12 mx-50">
        {/* Profile Picture and Name Section */}
        <div className="flex items-center gap-8 mb-12">
          {/* Profile Picture */}
          <div className="relative">
            {userData.profilePicture ? (
              <img 
                src={userData.profilePicture} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white text-5xl font-bold">
                  {getInitial()}
                </span>
              </div>
            )}
            <label 
              htmlFor="profilePicture"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <FiEdit2 className="w-5 h-5 text-gray-600" />
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>

          {/* Name and ID - Display saved userData, not formData */}
          <div>
            <h2 className="text-3xl font-bold text-br-red mb-1">
              {userData.user_name}
            </h2>
            <p className="text-br-orange text-sm font-medium">
              ID Number: {userData.user_id}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-br-orange transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-br-orange transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-br-orange transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="text-sm bg-br-red text-white font-bold px-8 py-3 rounded-full hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;