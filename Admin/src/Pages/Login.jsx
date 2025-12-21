import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../Context/AdminContext"
import axios from 'axios'
import { toast } from "react-toastify"
import { DoctorContext } from "../Context/DoctorContext"

const Login = () => {

    const [state, setState] = useState("Admin")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const { setAdminToken, backendUrl } = useContext(AdminContext)
    const { setDoctorToken } = useContext(DoctorContext);

    const onSubmitHandeler = async (event) => {
        event.preventDefault()

        try {
            if(state === 'Admin'){
                const { data } = await axios.post(backendUrl + '/api/admin/login', {email, password})
                if(data.success){   
                    localStorage.setItem('adminToken', data.token)     
                    setAdminToken(data.token); 
                    console.log(data.token);
                }
                else{
                    toast.error(data.message);
                }
            }
            else{ 
                const { data } = await axios.post(backendUrl + '/api/doctor/login', {email, password})
                if(data.success){   
                    localStorage.setItem('doctorToken', data.token)     
                    setDoctorToken(data.token); 
                    console.log(data.token);
                }
                else{
                    toast.error(data.message);
                }
            }
        } 
        catch (error) {
            
        }
    }

    return (
        <form onSubmit={onSubmitHandeler} className="min-h-[100vh] flex items-center">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px]
            sm:min-w-96 border border-gray-600 rounded-xl text-text text-sm shadow-lg">
                <p className="text-2xl font-semibold m-auto">
                    <span className="text-textSecondary">
                        {state } 
                    </span>  Login
                </p>

                {/* --- EMAIL --- */}
                <div className="w-full">
                    <p>
                        Email
                    </p>

                    <input 
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        className="border border-gray-600 text-text rounded-lg w-full p-2 mt-1"
                        type="email" 
                        required
                    />
                </div>

                {/* --- PASSWORD --- */}
                <div className="w-full">
                    <p>
                        Password
                    </p>

                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        className="border border-gray-600 text-text rounded-lg w-full p-2 mt-1"
                        type="password" 
                        required
                    />
                </div>
                <button className="w-full text-base py-2 rounded-lg">
                    Login
                </button>
                {
                    state === 'Admin'
                    ?<p>Doctor Login? 
                        <span 
                            className="text-blue-600 underline cursor-pointer"
                            onClick={() => setState('Doctor')}
                        >
                            Click Here
                        </span>
                    </p>
                    :<p>Admin Login? 
                        <span 
                            className="text-blue-600 underline cursor-pointer"
                            onClick={() => setState('Admin')}
                        >
                            Click Here
                        </span>
                    </p>
                }
            </div>
        </form>
    )
}

export default Login
