import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const fetchUser = async () => {
        const navigate = useNavigate();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/auth/home', {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            });
            if (response.status !== 201) {
                navigate('/login');
            }
            console.log(response);
        } catch (err) {
            navigate('/login');
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className='text-3x1 text-blue-500'>Home</div>
    )
}

export default Home