import axios from "axios";
import { useCallback } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken')? localStorage.getItem('adminToken') :'');
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashboardData, setDashboardData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    
    const getAllDoctors = useCallback(async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/all-doctor", {}, {headers: {adminToken: adminToken}});

            if(data.success){
                setDoctors(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }, [adminToken, backendUrl])

    // FUNCTION TO CHANGE THE AVAILABLE PROPERTY OF THE DOCTOR
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers: {adminToken: adminToken}});
            if(data.success){
                toast.success(data.message);
                getAllDoctors(); // IF AVAILABLE DATA IS UPDATED THEN UPDATE THE DOCTOS DATA ALSO
            }
            else{
                toast.error(error.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }
    
    // FUNCTION TO GET ALL THE APPOINTMENT ON ADMIN DASHBOARD
    const getAllAppointment = async () => {
        try {
            
            const { data } = await axios.get(backendUrl+'/api/admin/appointments', {headers: {adminToken: adminToken}})
            if(data.success){
                setAppointments(data.appointments);
                console.log(data.appointments);
            }
            else{
                toast.error(data.message)
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }

    // FUNCTION TO CANCEL APPOINTMENT
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl+'/api/admin/appointment-cancelled', {appointmentId}, {headers: {adminToken: adminToken}})
            if(data.success){
                toast.success(data.message);
                getAllAppointment();
            }
            else{
                toast.error(data.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }

    // FUNCTION TO GET THE DASHBOARD DATA FROM API
    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl+'/api/admin/dashboard', {headers: {adminToken: adminToken}});
            if(data.success){
                setDashboardData(data.dashboardData);
                console.log(data.dashboardData);
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }

    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointment,
        cancelAppointment,
        dashboardData,
        getDashboardData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider