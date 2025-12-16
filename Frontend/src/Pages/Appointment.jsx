import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../Components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const { docId } = useParams();
  const { doctors, currencySymbole, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    
    const fetchInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(fetchInfo)
  }

  const getAvailableSlot = async () => {
    setDocSlot([]);

    // GETTING CURRENT DATE
    let today = new Date();

    for(let i = 0; i < 7; i++){

      // GETTING DATE WITH INDEX -> FUTURE 7 DAYS FROM NOW 
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      // SETTING END TIME OF THE DATE WITH INDEX
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21,0,0,0);

      // SETTING HOURS
      if(today.getDate() === currDate.getDate()){
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1: 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      }
      else{
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlot = [];

      while(currDate < endTime){
        let formattedTime = currDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: true});
        
        let day = currDate.getDate();
        let month = currDate.getMonth() + 1;
        let year = currDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailabele = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
        if(isSlotAvailabele){
          // ADD SLOT TO ARRAY
          timeSlot.push({
            datetime: new Date(currDate),
            time: formattedTime
          })
        }
        
        // INCREMENT CURRENT TIME BY 30 MIN
        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      setDocSlot(prev => ([...prev, timeSlot]))
    }
  }

  // FUNCTION TO BOOK THE APPOINTMENT
  const bookAppointment = async () => {
    if(!token){
      toast.warn("LOGIN TO BOOK APPOINTMENT");
      return navigate('/login');
    }

    try { 
      const date = docSlot[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      console.log(slotDate);

      const { data } = await axios.post(backendUrl + "/api/user/book-appointment", {docId, slotDate, slotTime}, {headers: {token}})
      if(data.success){
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointment')
      }
      else{
        toast.error(data.message);
      }

    } 
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect( () => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect( () => {
    getAvailableSlot();
  }, [docInfo])

  useEffect( () => {
    console.log(docSlot); 
  }, [docSlot])


  return docInfo && (
    <div>
      {/* ----------- DOCTORS DETAILS --------------- */}

      <div className='flex flex-col gap-4 sm:flex-row'>
        
        {/* ----------- DOCTORS IMAGE --------------- */}
        <div>
          <img 
            className='bg-primary w-full sm:max-w-72 rounded-lg'
            src={docInfo.image} 
            alt="doctor's profile" 
          />
        </div>

        {/* ----------- DOCTORS INFO {NAME, DEGREE, EXP} --------------- */}
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img
              className='w-5' 
              src={assets.verified_icon} alt="verify-icon" />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-900'>
            <p className='text-gray-600'>
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {docInfo.experience}
            </button>
          </div>

          {/* ----------- ABOUT DOCTOR --------------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About
              <img src={assets.info_icon} alt="info-icon" />
            </p>

            <p className='text-gray-500 text-sm max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>

          <p className='text-gray-900 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbole}{docInfo.fees}</span>
          </p>
        </div>
      </div>
      
      {/* ----------- BOOKING SLOTS --------------- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlot.length && docSlot.map( (item, index ) => (

              <div 
                onClick={ () => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer 
                  ${slotIndex === index? 'bg-primary text-white': 'border border-gray-600'}`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        {/* ----------- TIMING OF BOOKING SLOTS --------------- */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlot.length && docSlot[slotIndex].map( (item, index ) => (
              <p
                onClick={ () => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 cursor-pointer rounded-full 
                  ${item.time === slotTime ? 'bg-primary text-white': 'border border-gray-600 text-gray-400'}`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>

        <button 
          onClick={bookAppointment}
          className='text-center bg-primary py-3 px-14 text-sm font-light text-white rounded-full my-6'>
          Book An Appointment
        </button>
      </div>

      {/* ----------- LISTING RELATED DOCTORS --------------- */}
      <RelatedDoctors 
        docId={docId} 
        speciality={docInfo.speciality} 
      />
    </div>
  )
}

export default Appointment
