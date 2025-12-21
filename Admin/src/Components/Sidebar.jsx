import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../Context/DoctorContext';

const Sidebar = () => {

    const { adminToken } = useContext(AdminContext);
    const { doctorToken } = useContext(DoctorContext);

    return (
        <div className='min-h-screen bg-surface'>

            {/* --------- ADMIN SIDEBAR ---------- */}
            {
                adminToken && <ul className='text-text mt-5'>
                    <NavLink 
                        to={'/admin-dashboard'}
                        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-150 
                            ${isActive ? 'bg-surfaceLight border-r-4 border-borderSoft': ''}`}
                    >
                        <img 
                            src={assets.home_icon} 
                            alt="home-icon" 
                        />
                        <p>
                            Dashboard
                        </p>
                    </NavLink>

                    <NavLink 
                        to={'/all-appointments'}
                        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-150 
                            ${isActive ? 'bg-surfaceLight border-r-4 border-borderSoft': ''}`}
                    >
                        <img 
                            src={assets.appointment_icon} 
                            alt="appointment-icon" 
                        />
                        <p>
                            Appointment
                        </p>
                    </NavLink>

                    <NavLink 
                        to={'/add-doctor'}
                        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-150 
                            ${isActive ? 'bg-surfaceLight border-r-4 border-borderSoft':''}`}
                    >
                        <img 
                            src={assets.add_icon} 
                            alt="add-icon" 
                        />
                        <p>
                            Add Doctor
                        </p>
                    </NavLink>

                    <NavLink 
                        to={'/doctors-list'}
                        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-150 
                            ${isActive ? 'bg-surfaceLight border-r-4 border-borderSoft': ''}`}
                    >
                        <img 
                            src={assets.people_icon} 
                            alt="list-icon" 
                        />
                        <p>
                            Doctors List
                        </p>
                    </NavLink>
                </ul>
            }

            {/* --------- DOCTOR SIDEBAR ---------- */}
            {
                doctorToken && <ul className='text-text mt-5'>
                    <NavLink 
                        to={'/doctor-dashboard'}
                        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-150 
                            ${isActive ? 'bg-surfaceLight border-r-4 border-borderSoft': ''}`}
                    >
                        <img 
                            src={assets.home_icon} 
                            alt="home-icon" 
                        />
                        <p className='hidden md:block'>
                            Dashboard
                        </p>
                    </NavLink>

                    <NavLink 
                        to={'/doctor-appointments'}
                        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-150 
                            ${isActive ? 'bg-surfaceLight border-r-4 border-borderSoft': ''}`}
                    >
                        <img 
                            src={assets.appointment_icon} 
                            alt="appointment-icon" 
                        />
                        <p className='hidden md:block'>
                            Appointments
                        </p>
                    </NavLink>

                    <NavLink 
                        to={'/doctor-profile'}
                        className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-150 
                            ${isActive ? 'bg-surfaceLight border-r-4 border-borderSoft': ''}`}
                    >
                        <img 
                            src={assets.people_icon} 
                            alt="list-icon" 
                        />
                        <p className='hidden md:block'>
                           Profile
                        </p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
