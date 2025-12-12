import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { adminToken, setAdminToken } = useContext(AdminContext);
    const navigate = useNavigate()

    const logout = () => {
        navigate('/');
        adminToken && setAdminToken('');
        adminToken && localStorage.removeItem('adminToken');
    }

    return (
        <div className='flex items-center justify-between text-sm px-6 py-4 mb-4
            border-b border-borderSoft bg-backgroundAlt/90 backdrop-blur-xl shadow-soft sticky top-0 z-50'>

            <div className='flex items-center text-sm gap-3'>
                <img 
                    className='w-36 sm:w-40 cursor-pointer'
                    src={assets.admin_logo} 
                    alt="admin-logo" 
                />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-400'>
                    {adminToken ? 'Admin' : "Doctor"}
                </p>
            </div>
            <button onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Navbar
