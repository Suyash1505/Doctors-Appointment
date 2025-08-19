import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-4
            border-b border-b-gray-400'>

            {/* LOGO */}
            <img 
                onClick={() => navigate('/')}
                className='w-44 cursor-pointer'
                src={assets.logo} 
                alt="logo" 
            />

            {/* LINKS */}
            <ul className='hidden md:flex items-start gap-5 font-medium'>

                {/* HOME */}
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
 
                {/* ALL DOCTORS */}
                <NavLink to='/doctors'>
                    <li className='py-1'>All Doctors</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

                {/* ABOUT */}
                <NavLink to='/about'>
                    <li className='py-1'>About</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

                {/* CONTACT */}
                <NavLink to='/contact'>
                    <li className='py-1'>Contact</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>

            {/* LOGIN */} {/* CONDITION WHEN TOKEN IS TRUE -> USER IS LOGIN
            SHOW PROFILE AND DROP DOWN ELSE SHOW CREATE ACCOUNT */}

            <div className='flex items-center gap-4'>
                {   
                    token
                    ?<div className='flex items-center gap-2 cursor-pointer group relative'>

                        <img 
                            className='w-8 rounded-full'
                            src={assets.profile_pic} 
                            alt="Profile" 
                        />

                        <img 
                            className='w-2.5'
                            src={assets.dropdown_icon} 
                            alt="dropDown-icon" 
                        />

                        {/* LINKS FOR DROP DOWN MENUE */}
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium
                        text-gray-600 z-20 hidden group-hover:block'>
                            
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p 
                                    onClick={() => navigate('/MyProfile')}
                                    className='hover:text-black cursor-pointer'>
                                    My Profile
                                </p>

                                <p 
                                    onClick={() => navigate('/my-appointment')}
                                    className='hover:text-black cursor-pointer'>
                                    My Appointment
                                </p>

                                <p 
                                    onClick={() => setToken(false)}
                                    className='hover:text-black cursor-pointer'>
                                    Logout
                                </p>

                            </div>
                        </div>
                    </div>

                    : <button 
                        className='bg-primary text-white px-8 py-3 rounded-full font-light 
                        hidden md:block'
                        onClick={() => navigate('/login')}
                    >
                        Create account
                    </button>
                }
                <img 
                    onClick={() => setShowMenu(true)}
                    className='w-6 md:hidden'
                    src={assets.menu_icon} 
                    alt="menu_icon"
                />

                {/* -------- MOBILE MENU ----------- */}
                <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 bottom-0 top-0 z-20 overflow-hidden transition-all bg-white`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img 
                            className='w-36'
                            src={assets.logo} 
                            alt="logo" 
                        />

                        <img 
                            className='w-7'
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon} 
                            alt="cross_icon" 
                        />
                    </div>

                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink  onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                        <NavLink  onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                        <NavLink  onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                        <NavLink  onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
