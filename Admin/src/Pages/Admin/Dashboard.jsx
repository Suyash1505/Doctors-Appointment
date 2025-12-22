import { useContext } from "react"
import { AdminContext } from "../../Context/AdminContext"
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";


const Dashboard = () => {

  const { dashboardData, getDashboardData, adminToken, cancelAppointment } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect( () => {
    if(adminToken){
      getDashboardData();
    }

  }, [adminToken])

  return dashboardData && (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        
        {/* ------- NUMBER OF DOCTORS ----------- */}
        <div className="flex items-center gap-2 bg-bgAlt p-4 min-w-52 rounded-xl border-2 border-borderSoft cursor-pointer hover:scale-105 transition-all">
          <img 
            className="w-14"
            src={assets.doctor_icon} 
            alt="doctors-icon" 
          />
          <div>
            <p className="text-xl font-semibold text-text">
              {dashboardData.doctors}
            </p>
            <p className="text-sm text-textMuted">
              Doctors
            </p>
          </div>
        </div>

        {/* ------- NUMBER OF APPOINTMENTS ----------- */}
        <div className="flex items-center gap-2 bg-bgAlt p-4 min-w-52 rounded-xl border-2 border-borderSoft cursor-pointer hover:scale-105 transition-all">
          <img 
            className="w-14"
            src={assets.appointments_icon} 
            alt="appointments-icon" 
          />
          <div>
            <p className="text-xl font-semibold text-text">
              {dashboardData.appointments}
            </p>
            <p className="text-sm text-textMuted">
              Appointments
            </p>
          </div>
        </div>

        {/* ------- NUMBER OF PATIENTS ----------- */}
        <div className="flex items-center gap-2 bg-bgAlt p-4 min-w-52 rounded-xl border-2 border-borderSoft cursor-pointer hover:scale-105 transition-all">
          <img
            className="w-14" 
            src={assets.patients_icon} 
            alt="doctors-icon" 
          />
          <div>
            <p className="text-xl font-semibold text-text">
              {dashboardData.patients}
            </p>
            <p className="text-sm text-textMuted">
              Patients
            </p>
          </div>
        </div>
      </div>

      {/* ------------ LATEAST APPOINTMENTS --------------- */}
      <div className="bg-bgAlt">

        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-borderSoft">
          <img 
            src={assets.list_icon} 
            alt="list-icon" 
          />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="border-t-0 border-borderSoft pt-4">
          {
            dashboardData.latestAppointments.map( (item, index) => (
              <div className="flex items-center px-6 py-3 hover:bg-bg" key={index}>
                <img
                  className="rounded-full w-10" 
                  src={item.docId.image} 
                  alt="doctors-image" 
                />
              
                <div className="flex-1 text-sm">
                  <p className="text-text font-medium">{item.docId.name}</p>
                  <p className="text-textMuted">{slotDateFormat(item.slotDate)}</p>
                </div>

               { 
                  item.cancelled 
                  ? <p className='text-red-500 text-xs font-medium'>
                    Cancelled
                  </p>
                  : item.isCompleted
                    ? <p className='text-green-500'>Completed</p>
                    :<img 
                      onClick={ () => cancelAppointment(item._id)}
                      className='w-10 cursor-pointer'
                      src={assets.cancel_icon} 
                      alt="cancle-icon" 
                    />
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
