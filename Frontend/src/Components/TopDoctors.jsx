import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div className="flex flex-col gap-4 items-center my-16 text-text md:mx-10">
      {/* Heading */}
      <h1 className="text-3xl font-inter font-semibold">
        Top Doctors to Book
      </h1>

      {/* Subtext */}
      <p className="sm:w-1/3 text-center text-sm text-text-secondary">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              scrollTo(0, 0)
            }}
            className="border border-border-soft rounded-xl overflow-hidden cursor-pointer 
                       hover:-translate-y-[-10px] transition-transform duration-300 bg-surface shadow-card"
          >
            {/* Doctor Image */}
            <img
              className="bg-blue-100"
              src={item.image}
              alt={item.name}
            />

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm mb-2 text-center">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span className="text-success">Available</span>
              </div>

              <p className="text-text text-lg font-medium">{item.name}</p>
              <p className="text-text-secondary text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0)
        }}
        className="bg-primary hover:bg-primaryHover text-white px-10 py-3 rounded-full mt-10 transition-colors duration-300"
      >
        More
      </button>
    </div>
  )
}

export default TopDoctors
