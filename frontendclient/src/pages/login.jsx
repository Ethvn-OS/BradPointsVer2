import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cover from '../assets/images/assorted.jpg';
import logo from '../assets/images/BradPointsLogo.png';
import { MdOutlineEmail } from "react-icons/md";
import { LuKeyRound } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {

  const [showPassword, setPassword] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');

      const response = await axios.post('https://bradpoints.dcism.org/auth/login', values);
      console.log(response);
      if (response.status === 201) {
        const { token, usertype } = response.data;
        localStorage.setItem('token', token);

        showNotification('Login successful! Redirecting...', 'success');

        setTimeout(() => {
          hideNotification();
          setTimeout(() => {
            if (usertype === 1) navigate('/cashierhome');
            else if (usertype === 2) navigate('/home');
            else if (usertype === 3) navigate('/dashboard');
            else navigate('/home');
          }, 300);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
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
      className="flex flex-row items-center justify-center bg-white rounded-3xl h-120 max-w-4xl w-full shadow-2xl overflow-hidden border-l-12 border-orange-500">
        <div className="flex flex-row w-full h-full">

          {/* Left Side */}
          <div className="relative w-2/5 h-full">
            <img src={cover} alt="Braddex" className="object-cover w-auto h-full"/>
          </div>

          {/* Right Side */}
          <div className="w-3/5 px-8 py-16 flex flex-col items-center justify-center">
            <img src={logo} alt="BradPoints" className="w-16 h-16 object-cover mb-4" />
            <h2 className="text-4xl font-bold mb-8 text-br-orange text-work-sans">Login</h2>

            <form className='flex flex-col justify-center items-center w-full' onSubmit={handleSubmit}>
              <div className="mb-4 w-full flex flex-col justify-center items-center px-12 gap-6">
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
                    className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-md focus:border-orange-500 focus:outline-none text-black placeholder-gray-300   text-work-sans"
                  />
                  <button
                    type='button'
                    onClick={() => setPassword(!showPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-br-gray text-xl'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

              </div>
              <div className='w-full px-12 mt-8 flex flex-col gap-6 justify-center items-center'>
                <button
                type='submit'
                className='flex items-center justify-center w-full py-2 text-work-sans font-bold text-white text-lg bg-br-orange rounded-lg transform hover:scale-105 transition duration-300 ease-out cursor-pointer'>
                  LOGIN
                </button>
                <p className='text-work-sans text-xs text-black'>Dont have an account yet? 
                  <Link to="/signup" className='text-br-orange hover:underline'> Sign up</Link>
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

export default Login;