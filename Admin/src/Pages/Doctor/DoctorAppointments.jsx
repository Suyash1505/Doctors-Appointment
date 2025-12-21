import { useContext } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {

  const { doctorToken, appointments, getAllAppointment, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect( () => {
    if(doctorToken){
      getAllAppointment();
    }
  }, [doctorToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
    <p className='mb-3 text-lg font-medium'>
      All Appointments
    </p>

    <div className='bg-bgAlt border border-gray-500 rounded text-sm min-h-[60vh]'>
      <div className='max-sm:hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Data & Time</p>
        <p>Fees</p> 
        <p>Actions</p>
      </div>

      {
        appointments.reverse().map( (item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center text-textSecondary py-3 px-6 border-b hover:bg-bg' key={index}>
            <p className='max-sm:hidden'>
              {index + 1}
            </p>

            <div className='flex items-center gap-2'>
              <img 
                className='w-8 rounded-full'
                src={item.userId?.image} 
                alt="User-Image" 
              />
              <p>
                {item.userId?.name}
              </p>
            </div>

            <div>
              <p className='text-xs inline border border-gray-400 px-2 rounded-full text-textMuted'>
                {item.payment ? 'ONLINE' : 'CASH'}
              </p>
            </div>

            <p className='max-sm:hidden'>
              {calculateAge(item.userId?.dob)}
            </p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}{item.amount}
            </p>

            {
              item.cancelled
              ?<p className='text-red-500 text-xs font-medium'>
                Cancelled
              </p>
              :item.isCompleted
                ?<p className='text-green-500 text-xs font-medium'>
                  Completed
                </p>
                :<div className='flex'>
                  <img 
                    onClick={() => cancelAppointment(item._id)}
                    className='w-10 cursor-pointer' 
                    src={assets.cancel_icon} 
                    alt="cancel-icon" 
                  />
                  <img 
                    onClick={() => completeAppointment(item._id)}
                    className='w-10 cursor-pointer' 
                    src={assets.tick_icon} 
                    alt="tick-icon" 
                  />
                </div>
            }
          </div>
        ))
      }
    </div>
  </div>
  )
}

export default DoctorAppointments

