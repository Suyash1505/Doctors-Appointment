import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();
const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [doctorToken, setDoctorToken] = useState(localStorage.getItem('doctorToken')? localStorage.getItem('doctorToken') :'')
    const [appointments, setAppointments] = useState([]);

    // FUNCTION TO GET ALL THE APPOINTMENT ON ADMIN DASHBOARD
    const getAllAppointment = async () => {
        try {
            const { data } = await axios.get(backendUrl+'/api/doctor/appointments', {headers: {doctorToken: doctorToken}})
            if(data.success){
                setAppointments(data.appointments);
                console.log(data.appointments);
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // FUNCTION TO MARK APPOINTMET AS COMPLETED
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl+'/api/doctor/complete-appointment', {appointmentId}, {headers: {doctorToken: doctorToken}})
            if(data.success){
                toast.success(data.message);
                getAllAppointment();
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    // FUNCTION TO CANCEL APPOINTMENT
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl+'/api/doctor/cancel-appointment', {appointmentId}, {headers: {doctorToken: doctorToken}})
            if(data.success){
                toast.success(data.message);
                getAllAppointment();
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        doctorToken,
        setDoctorToken,
        backendUrl,
        appointments,
        setAppointments,
        getAllAppointment,
        completeAppointment,
        cancelAppointment
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider