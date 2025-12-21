import { useState } from "react";
import { createContext } from "react";

export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken')? localStorage.getItem('doctorToken') :'')
    
    const value = {
        doctorToken,
        setDoctorToken,
        backendUrl
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider