import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  
  return (
    <div>
      
      <div className='text-center text-2xl text-gray-500 pt-10'>
        <p>ABOUT <span className='text-gray-600 font-medium'>US</span> </p>
      </div>

      <div className='flex flex-col my-10 md:flex-row gap-12'>
        { /* ------------ LEFT PART -------------- */}
        <img 
          className='w-full md:max-w-[360px] rounded-lg'
          src={assets.about_image} 
          alt="about_image"
        />

        { /* ------------ RIGHT PART -------------- */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            Welcome To CureLine, Your Trusted Partner In Managing Your Healthcare Needs Conveniently And Efficiently.
            At Prescripto, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor 
            Appointments And Managing Their Health Records. 
          </p>

          <p>
            CureLine Is Committed To Excellence In Healthcare Technology. We Continuously Strive To Enhance Our Platform, 
            Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service.
            Whether You're Booking Your First Appointment Or Managing Ongoing Care, 
            Prescriete Is Here To Support You Every Step Of The Way.
          </p>

          <b className='text-gray-100'>Our Vision</b>

          <p>
            Our Vision At Prescripto Is To Create A Seamless Healthcare Experience For Every User. 
            We Aim To Bridge The Gap Between Patients And Healthcare Providers, 
            Making It Easier For You To Access The Care You Need, When You Need It.
          </p>

        </div>
      </div>

      { /* ------------ WHY CHOOSE US -------------- */}
      <div className='text-xl my-4'>
        <p className='text-text'>WHY 
          <span className='text-gray-600 font-semibold'>CHOOSE US</span> 
        </p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        { /* ------------ EFFICIENCY -------------- */}
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-l-xl'>
          <b>EFFICIENCY:</b>
          <p>
            Streamlined Appointment Scheduling
            That Fits Into Your Busy Lifestyle.
          </p>
        </div>

        { /* ------------ CONVENIENCE ------------- */}
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>
            Access To A Network Of Trusted
            Healthcare Professionals In Your Area.
          </p>
        </div>

        { /* ------------ PERSONALIZATION -------------- */}
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-r-xl'>
          <b>PERSONALIZATION:</b>
          <p>
            Tailored Recommendations And Reminders
            To Help You Stay On Top Of Your Health.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About

