import React, { useEffect } from 'react'

const CashierHome = () => {
    const fetchUser = async () => {
        const navigate = useNavigate();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/auth/cashierhome', {
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

    // here i add ang imong related code yza

    return (
        <div className='text-3x1 text-blue-500'>Cashier</div>
    )
}

export default CashierHome