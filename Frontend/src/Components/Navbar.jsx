import { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext.jsx';

const Navbar = () => {

    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between text-sm px-6 py-4 mb-4
            border-b border-borderSoft bg-backgroundAlt/90 backdrop-blur-xl shadow-soft sticky top-0 z-50'>

            {/* LOGO */}
            <img 
                onClick={() => navigate('/')}
                className='w-40 cursor-pointer hover:scale-[1.02] transition-all duration-200'
                src={assets.logo} 
                alt="logo" 
            />

            {/* LINKS */}
            <ul className='hidden md:flex items-center gap-7 font-medium text-text text-xl'>

                {/* HOME */}
                <NavLink to='/' className='group'>
                    <li className='py-1 hover:text-primary transition'>Home</li>
                    <hr className='border-none outline-none h-[2px] bg-primary w-3/5 mx-auto scale-x-0 group-hover:scale-x-100 transition-transform' />
                </NavLink>
 
                {/* ALL DOCTORS */}
                <NavLink to='/doctors' className='group'>
                    <li className='py-1 hover:text-primary transition'>All Doctors</li>
                    <hr className='border-none outline-none h-[2px] bg-primary w-3/5 mx-auto scale-x-0 group-hover:scale-x-100 transition-transform' />
                </NavLink>

                {/* ABOUT */}
                <NavLink to='/about' className='group'>
                    <li className='py-1 hover:text-primary transition'>About</li>
                    <hr className='border-none outline-none h-[2px] bg-primary w-3/5 mx-auto scale-x-0 group-hover:scale-x-100 transition-transform' />
                </NavLink>

                {/* CONTACT */}
                <NavLink to='/contact' className='group'>
                    <li className='py-1 hover:text-primary transition'>Contact</li>
                    <hr className='border-none outline-none h-[2px] bg-primary w-3/5 mx-auto scale-x-0 group-hover:scale-x-100 transition-transform' />
                </NavLink>
            </ul>

            {/* LOGIN */}
            <div className='flex items-center gap-4'>
                {   
                    token && userData
                    ?<div className='flex items-center gap-2 cursor-pointer group relative'>

                        <img 
                            className='w-9 rounded-full border border-borderSoft shadow-soft hover:scale-105 transition'
                            src={userData.image} 
                            alt="Profile" 
                        />

                        <img 
                            className='w-3 opacity-70 group-hover:opacity-100 transition'
                            src={assets.dropdown_icon} 
                            alt="dropDown-icon" 
                        />

                        {/* DROPDOWN MENU */}
                        <div className='absolute top-0 right-0 pt-14 text-sm font-medium
                        text-textSecondary z-20 hidden group-hover:block transition'>

                            <div className='min-w-52 rounded-xl flex flex-col gap-3 p-4 border border-borderSoft 
                            bg-surface/80 backdrop-blur-xl shadow-xl'>

                                <p 
                                    onClick={() => navigate('/MyProfile')}
                                    className='hover:text-primary hover:bg-surfaceLight px-2 py-1 rounded transition cursor-pointer'>
                                    My Profile
                                </p>

                                <p 
                                    onClick={() => navigate('/my-appointment')}
                                    className='hover:text-primary hover:bg-surfaceLight px-2 py-1 rounded transition cursor-pointer'>
                                    My Appointment
                                </p>

                                <p 
                                    onClick={logout}
                                    className='hover:text-danger hover:bg-surfaceLight px-2 py-1 rounded transition cursor-pointer'>
                                    Logout
                                </p>

                            </div>
                        </div>
                    </div>

                    : <button 
                        className='bg-primary hover:bg-primaryHover text-white px-7 py-2.5 rounded-full font-medium 
                        hidden md:block shadow-soft hover:shadow-glow transition'
                        onClick={() => navigate('/login')}
                    >
                        Create account
                    </button>
                }
                <img 
                    onClick={() => setShowMenu(true)}
                    className='w-7 md:hidden opacity-80 hover:opacity-100 transition'
                    src={assets.menu_icon} 
                    alt="menu_icon"
                />

                {/* -------- MOBILE MENU ----------- */}
                <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden 
                        right-0 bottom-0 top-0 z-50 overflow-hidden transition-all 
                        bg-backgroundAlt backdrop-blur-xl`}>

                    <div className='flex items-center justify-between px-5 py-6 border-b border-borderSoft'>
                        <img 
                            className='w-36'
                            src={assets.logo} 
                            alt="logo" 
                        />

                        <img 
                            className='w-7 hover:rotate-90 transition'
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon} 
                            alt="cross_icon" 
                        />
                    </div>

                    <ul className='flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-5 py-2 rounded-full hover:bg-surfaceLight hover:text-primary transition'>Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-5 py-2 rounded-full hover:bg-surfaceLight hover:text-primary transition'>All Doctors</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-5 py-2 rounded-full hover:bg-surfaceLight hover:text-primary transition'>About</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-5 py-2 rounded-full hover:bg-surfaceLight hover:text-primary transition'>Contact</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
