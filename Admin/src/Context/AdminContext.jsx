import axios from "axios";
import { useCallback } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {

    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken')? localStorage.getItem('adminToken') :'');
    const [doctors, setDoctors] = useState([]);

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

    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider