import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
        
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* --------- LEFT PART ----------- */}
                <div>
                    <img 
                        className='mb-5 w-40'
                        src={assets.logo} 
                        alt="logo" 
                    />

                    <p className='w-full md:w-2/3 text-text leading-6'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius assumenda facilis beatae voluptatem corrupti, quas saepe nobis suscipit molestiae temporibus? Qui ratione, possimus voluptas autem sint eveniet quam veritatis dolore.
                    </p>
                </div>

                {/* --------- CENTRE PART ----------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>
                        COMPANY
                    </p>

                    <ul className='flex flex-col gap-2 text-text-muted'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* --------- RIGHT PART ----------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>
                        GET IN TOUCH
                    </p>

                    <ul className='flex flex-col gap-2 text-text-muted'>
                        <li>+91-913-170-3245</li>
                        <li>adv.mks7171@gmail.com</li>
                    </ul>
                </div>
                
            </div>

            {/* --------- COPY RIGHT TEXT ----------- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>
                    Copyright 2025@ CureLine - All right reserved
                </p>
            </div>
        </div>
    )
}

export default Footer
