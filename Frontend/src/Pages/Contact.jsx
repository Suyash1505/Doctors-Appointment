import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>
      <p className='text-center text-text text-2xl pt-10'>CONTACT <span className='text-gray-600 font-semibold'>US</span></p>

      <div className='flex flex-col md:flex-row justify-center my-10 gap-10 mb-28 text-sm'>
        {/* ------------LEFT PART ------------- */}
        <div>
          <img 
            className='w-full max-w-[360px] rounded-lg'
            src={assets.contact_image}
            alt="contact_image"
          />
        </div>

        {/* ------------RIGHT PART ------------- */}
        <div className='flex flex-col justify-center items-start gap-6'>
          
          <p className='font-semibold text-lg text-text'>
            OUR OFFICE
          </p>

          <p className='text-gray-400'>
            54709, Willms Station <br /> Suite 350,Washington, USA 
          </p>

          <p className='text-gray-400'>
            Tel: (451) 555-0123 <br /> Email: adv.mks7171@gmail.com
          </p>

          <p className='font-semibold text-lg text-text'>
            CAREERS AT CURELINE
          </p>

          <p className='text-gray-400'>
            Learn more about our teams and job openings. 
          </p>
          
          <button 
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
          >
            Explore Jobs
          </button>
        </div>

      </div>
    </div>
  )
}

export default Contact
