import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  
  const [userData, setUserData] = useState({

    name:'Suyash Mukesh Shrivastava',
    image: assets.profile_pic,
    email: "adv.mks7171@gmail.com",
    phone: '(+91) 9131-703-245',
    address: {
      line1: 'H.No 752 Behind Mili Guha Hospital',
      line2: 'Gupteshwar, Jablpur'
    },
    gender: 'Male',
    dob: '1996-05-15'
  })

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='max-w-lg flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl border-gray-600 shadow-xl text-sm'>
      <img 
        className='w-36 rounded-full'
        src={userData.image}
        alt="profile" 
      />

      {
        isEdit 
        ? <input 
            className='text-3xl font-medium max-w-60 mt-4 border-gray-600'
            onChange={ (e) => setUserData( prev => ({...prev, name:e.target.value}))}
            value={userData.name}
            type="text" 
          />
        : <p className='text-3xl font-medium text-text mt-4'>
            {userData.name}
          </p>
      }

      <hr className='bg-gray-400 h-[1px] border-none'/>
      <div>
        <p className='text-gray-400 mt-3 underline'>
          CONTACT INFORMATION
        </p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-600'>
          <p className='font-medium'>
            Email id:
          </p>
          {
            isEdit 
            ? <input 
                className='max-w-52'
                onChange={ (e) => setUserData( prev => ({...prev, email:e.target.value}))}
                value={userData.email}
                type="text" 
              />
            : <p className='text-blue-400'>{userData.email}</p>
          }

          <p className='font-medium'>Phone:</p>
          {
            isEdit 
            ? <input 
                className='max-w-52'
                onChange={ (e) => setUserData( prev => ({...prev, phone:e.target.value}))}
                value={userData.phone}
                type="text" 
              />
            : <p className='text-blue-400'>{userData.phone}</p>
          }

          <p className='font-medium'>Address:</p>
          {
            isEdit
            ?<p>
              <input 
                className='mb-1'
                onChange={(e) => setUserData( prev => ({...prev, address: {...prev.address, line1:e.target.value}}))}
                value={userData.address.line1}
                type="text" 
              />
              <br />
              <input 
                className=''
                onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2:e.target.value}}))}
                value={userData.address.line2}
                type="text" 
              />
            </p>
            :<p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>

      </div>

      <div>
        <p className='text-neutral-500 mt-3 underline'>
          BASIC INFORMATION
        </p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 gap-3'>
          <p className='font-medium'>
            Gender:
          </p>
          {
            isEdit 
            ? <select className='max-w-25' onChange={ (e) => setUserData(prev => ({...prev, gender:e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium'>
            DOB:
          </p>
          {
            isEdit
            ?<input 
              className='max-w-25'
              onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))}
              value={userData.dob}
              type="date"
            />
            :<p className='text-gray-400'>{userData.dob}</p>
          }
        </div>

      </div>

      <div className='mt-10'>
        {
          isEdit
          ?<button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={ () => setIsEdit(false)}>
            Save Information
          </button>
          :<button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={ () => setIsEdit(true)}>
            Edit
          </button>
        }
      </div>

    </div>
  )
}

export default MyProfile
