import React, { useState } from 'react';
import cover from '../assets/images/assorted.jpg';
import logo from '../assets/images/BradPointsLogo.png';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { LuKeyRound } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from 'axios';

const Signup = () => {

  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // para sa backend stuff
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: '' });
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    
    if (!/[a-zA-Z]/.test(password)) {
      return 'Password must contain at least one letter.';
    }
    
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number.';
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return 'Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?).';
    }
    
    return null; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const passwordError = validatePassword(values.password);
    if (passwordError) {
      showNotification(passwordError, 'error');
      setTimeout(() => {
        hideNotification();
      }, 3000);
      return;
    }
    
    if (values.password !== confirmPassword) {
      showNotification('Passwords do not match. Please try again.', 'error');
      setTimeout(() => {
        hideNotification();
      }, 3000);
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', values);
      console.log(response);
      if (response.status === 201) {
        showNotification('Account created successfully! Redirecting to login...', 'success');
        
        setTimeout(() => {
          hideNotification();
          setTimeout(() => {
            navigate('/login');
          }, 300); 
        }, 2000);
      }
    } catch(err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || err.message || 'Sign up failed. Please try again.';
      showNotification(errorMessage, 'error');
      
      setTimeout(() => {
        hideNotification();
      }, 3000);
    }
  }

  return (
    <>
    {/* Notification */}
    {notification.show && (
      <motion.div
        initial={{ opacity: 0, y: -50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -50, x: '-50%' }}
        className={`fixed top-4 left-1/2 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}
      >
        {notification.type === 'success' ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )}
        <span className="font-medium">{notification.message}</span>
      </motion.div>
    )}

    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F2EAD3]">
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-row items-center justify-center bg-white rounded-3xl h-150 max-w-4xl w-full shadow-2xl overflow-hidden border-l-12 border-orange-500">
        <div className="flex flex-row w-full h-full">

          {/* Left Side */}
          <div className="relative w-2/5 h-full">
            <img src={cover} alt="Braddex" className="object-cover w-auto h-full"/>
          </div>

          {/* Right Side */}
          <div className="w-3/5 px-8 py-16 flex flex-col items-center justify-center">
            <img src={logo} alt="BradPoints" className="w-16 h-16 object-cover mb-4" />
            <h2 className="text-4xl font-bold mb-8 text-br-orange text-work-sans">Sign-Up</h2>

            <form className='flex flex-col justify-center items-center w-full' onSubmit={handleSubmit}>
              <div className="mb-4 w-full flex flex-col justify-center items-center px-12 gap-6">

                {/* username */}
                <div className="relative w-full">
                  <FaRegUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-br-gray text-lg" />
                  <input
                    type="text"
                    id="username"
                    name="username" onChange={handleChanges}
                    placeholder="username"
                    className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-md focus:border-orange-500 focus:outline-none text-black placeholder-gray-300 text-work-sans"
                  />
                </div>

                {/* email */}
                <div className="relative w-full">
                  <MdOutlineEmail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-br-gray text-xl" />
                  <input
                    type="email"
                    id="email"
                    name="email" onChange={handleChanges}
                    placeholder="email"
                    className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-md focus:border-orange-500 focus:outline-none text-black placeholder-gray-300 text-work-sans"
                  />
                </div>

                {/* password */}
                <div className="relative w-full">
                  <LuKeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-br-gray text-xl" />
                  <input
                    type= {showPassword ? "text" : "password"}
                    id="password"
                    name="password" onChange={handleChanges}
                    placeholder="password"
                    className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-md focus:border-orange-500 focus:outline-none text-black placeholder-gray-300 text-work-sans"
                  />
                  <button
                    type='button'
                    onClick={() => setPassword(!showPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-br-gray text-xl'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* confirm password */}
                <div className="relative w-full">
                  <LuKeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-br-gray text-xl" />
                  <input
                    type= {showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="confirm password"
                    className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-md focus:border-orange-500 focus:outline-none text-black placeholder-gray-300 text-work-sans"
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-br-gray text-xl'
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

              </div>
              <div className='w-full px-12 mt-8 flex flex-col gap-6 justify-center items-center'>
                <button 
                type='submit'
                className='flex items-center justify-center w-full py-2 text-work-sans font-bold text-white text-lg bg-br-orange rounded-lg transform hover:scale-105 transition duration-300 ease-out cursor-pointer'>
                  SIGN-UP
                </button>
                <p className='text-work-sans text-xs text-black'>Have an account already? 
                  <Link to="/login" className='text-br-orange hover:underline'> Login</Link>
                </p>
              </div>
            </form>

          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default Signup;