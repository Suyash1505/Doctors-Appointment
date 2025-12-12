import { useContext } from 'react';
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext';

const App = () => {

  const { adminToken } = useContext(AdminContext);

  return  adminToken ? (
    <div> 
      <ToastContainer/>
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
