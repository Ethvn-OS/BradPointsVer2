import React, { useState } from 'react';
import cover from '../assets/images/assorted.jpg';
import logo from '../assets/images/BradPointsLogo.png';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { LuKeyRound } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from 'axios';

const Signup = () => {

  const [showPassword, setPassword] = useState(false);

  // para sa backend stuff
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChanges = (e) => {
    setValues({...values, [e.target.name]: [e.target.value]})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080')
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
      initial={{ opacity: 0, y: 50 }}      
      animate={{ opacity: 1, y: 0 }}        
      transition={{ duration: 0.8, ease: "easeOut" }} 
      className="flex flex-row items-center justify-center bg-white rounded-3xl h-140 max-w-4xl w-full shadow-2xl overflow-hidden border-l-12 border-orange-500">
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

              </div>
            </form>
            
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
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
};

export default Signup;