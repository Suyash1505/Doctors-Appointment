import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState('');
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General Physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    
    // ADD THE API TO ADD DOCTOR TO THE DATA BASE
    const { adminToken, backendUrl } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if(!docImg){
                return toast.error('IMAGE NOT SELECTED');
            }

            // ADD THE DETAILS OF THE DOCTOR
            const formData = new FormData();
            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({line1: address1, line2: address2}));

            // CONSOLE LOG FORM DATA
            formData.forEach( (value, key) => {
                console.log(`${key} : ${value}`); 
            })

            // API CALL TO SAVE THE DOCTOR DETAIL IN THE BACKEND
            console.log("Admin Token in Context:", adminToken);

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { adminToken }});
            if(data.success){
                toast.success(data.message);

                // CLEAR THE INPUTS AFTER DATA IS ADDED IN DATABASE
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');
                setAddress1('');
                setAddress2('');
                setDegree('')
                setFees('');
                setAbout('')
            }
            else{
                toast.error(data.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='max-w-2xl flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl border-gray-600 shadow-xl text-sm'>
            <p className='mb-3 text-lg font-medium'>
                ADD <span className='text-textMuted'>DOCTOR</span>
            </p>

            <div className='px-8 py-8 rounded w-full max-w-4xl max-h-[80vh]'>
                <div className='flex items-center gap-4 mb-8 text-textMuted'>
                    <label htmlFor="doc-image">
                        <img 
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
                            alt="profile-image" 
                            className='w-20 bg-bgAlt cursor-pointer rounded-full'
                        />
                    </label>

                    <input 
                        type="file"
                        id="doc-image" 
                        hidden
                        onChange={(event) => setDocImg(event.target.files[0])}
                    />

                    <p>
                        Upload Doctor <br /> Image
                    </p>
                </div>  

                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full flex lg:flex-1 flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>
                                Doctor's Name
                            </p>
                            <input 
                                type="text" 
                                placeholder="Doctor's Name"
                                required
                                onChange={(event) => setName(event.target.value)}
                                value={name}
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>
                                Doctor's Email
                            </p>
                            <input 
                                type="email" 
                                placeholder='Email'
                                required
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>
                                Doctor's Password
                            </p>
                            <input 
                                type="password" 
                                placeholder='Password'
                                required
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>
                                Experience
                            </p>
                            <select onChange={(event) => setExperience(event.target.value)} value={experience} >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>
                                Fees
                            </p>
                            <input 
                                type="number" 
                                placeholder='Fees'
                                required
                                onChange={(event) => setFees(event.target.value)}
                                value={fees}
                            />
                        </div>
                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>
                                Speciality
                            </p>
                            <select onChange={(event) => setSpeciality(event.target.value)} value={speciality}>
                                <option value="General Physician">General Physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>
                                Education
                            </p>
                            <input 
                                type="text" 
                                placeholder='Education'
                                required
                                onChange={(event) => setDegree(event.target.value)}
                                value={degree}
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <p>
                                Address
                            </p>
                            <input 
                                type="text" 
                                placeholder='address 1'
                                required
                                onChange={(event) => setAddress1(event.target.value)}
                                value={address1}
                            />
                            <input 
                                type="text" 
                                placeholder='address 2'
                                required
                                onChange={(event) => setAddress2(event.target.value)}
                                value={address2}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <p className='mt-4 mb-2'>
                        About Doctor
                    </p>
                    <textarea 
                        placeholder='Write about doctor'
                        required
                        rows={5}
                        className='w-full px-4 pt-2'
                        onChange={(event) => setAbout(event.target.value)} value={about}
                    />
                </div>

                <button className='mt-4' type='submit'>
                    Add Doctor
                </button>
            </div>
        </form>
    )
}

export default AddDoctor
