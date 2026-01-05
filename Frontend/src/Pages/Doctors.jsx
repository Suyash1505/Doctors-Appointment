import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const Doctors = () => {

  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  
  const [filterDoc, setFilterDoc] = useState([]);
  const [filter, setFilter] = useState(false);

  const navigate = useNavigate();

  const applyfilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else{
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyfilter()
  }, [doctors, speciality])

  return (
    <div>

      {/* LEFT SIDE */}
      <p className='text-text-muted'>Browse through the doctors specilist.</p>

      <div className='flex flex-col items-start sm:flex-row gap-5 mt-5'>                

        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            filter? 'bg-blue-600 text-white' : ''
          }`}
          onClick={() => setFilter(prev => !prev)}
        >
          Filters
        </button>

        <div className={`flex-col gap-4 text-sm text-gray-700 ${filter ? 'flex' : 'hidden sm:flex'}`}>

          <p
            onClick={() => speciality === 'General physician'? navigate('/doctors'): navigate('/doctors/General physician')}
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General physician" ? "bg-indigo-100 text-black": ""
            }`}
          >
            General Physician
          </p>

          <p
            onClick={() => speciality === 'Gynecologist'? navigate('/doctors'): navigate('/doctors/Gynecologist')}
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black": ""
            }`}
          >
            Gynecologist
          </p>

          <p
            onClick={() => speciality === 'Dermatologist'? navigate('/doctors'): navigate('/doctors/Dermatologist')}
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black": ""
            }`}
          >
            Dermatologist
          </p>

          <p
            onClick={() => speciality === 'Pediatricians'? navigate('/doctors'): navigate('/doctors/Pediatricians')}
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black": ""
            }`}
          >
            Pediatricians
          </p>

          <p
            onClick={() => speciality === 'Neurologist'? navigate('/doctors'): navigate('/doctors/Neurologist')}
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black": ""
            }`}
          >
            Neurologist
          </p>

          <p
            onClick={() => speciality === 'Gastroenterologist'? navigate('/doctors'): navigate('/doctors/Gastroenterologist')}
            className={`w-[94vw] sm:w-auto pl-3 pr-16 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist" ? "bg-indigo-100 text-black": ""
            }`}
          >
            Gastroenterologist
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterDoc.map( (item, index) => (
              <div key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer 
                transition-all duration-500 hover:-translate-y-2.5'
              >

                <img
                  className='bg-blue-50'
                  src={item.image}
                  alt="doctors-images"
                />

                <div className='p-4'>
                  <div className="flex items-center gap-2 text-sm mb-2 text-center">
                    <span className={`w-2 h-2 ${item.available ? ' bg-success': 'bg-danger'}rounded-full`}></span>
                    <span className={`${item.available ? "text-success" : 'text-red-500'}`}>{item.available ? 'Available' : 'Not Available'}</span>
                  </div>
                  <p className='text-text text-lg font-medium'>{item.name}</p>
                  <p className='text-text-muted text-sm'>{item.speciality}</p>
                </div>

              </div>
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Doctors
