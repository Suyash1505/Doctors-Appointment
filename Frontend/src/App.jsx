import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Doctors from './Pages/Doctors'
import Login from './Pages/Login'
import MyAppointment from './Pages/MyAppointment'
import MyProfile from './Pages/MyProfile'
import Appointment from './Pages/Appointment'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='mx4-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/MyProfile' element={<MyProfile />} />

        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />  
        <Route path='/my-appointment' element={<MyAppointment />} /> 
        <Route path='/appointment/:docId' element={<Appointment />} /> 
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
