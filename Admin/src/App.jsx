import { useContext } from 'react';
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import AllAppointments from './Pages/Admin/AllAppointments';
import AddDoctor from './Pages/Admin/AddDoctor';
import DoctorsList from './Pages/Admin/DoctorsList';
import { DoctorContext } from './Context/DoctorContext';

const App = () => {

  const { adminToken } = useContext(AdminContext);
  const { doctorToken } = useContext(DoctorContext);

  return  adminToken || doctorToken ? (
    <div className='mx4-4 max-w-100%'> 
      <ToastContainer/>
      <Navbar/>

      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctors-list' element={<DoctorsList/>} />
        </Routes>
      </div>
    </div>
  )
  :(
    <div> 
      <Login/>
      <ToastContainer/>
    </div>
  )
}

export default App
