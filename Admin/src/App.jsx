import { useContext } from 'react';
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';

const App = () => {

  const { adminToken } = useContext(AdminContext);

  return  adminToken ? (
    <div className='mx4-4 sm:mx-[10%]'> 
      <ToastContainer/>
      <Navbar/>
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
