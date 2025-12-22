import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../../Context/DoctorContext';
import { AppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';

const DoctorProfile = () => {

  const {
    doctorToken,
    docData,
    setDocData,
    getProfileData,
    backendUrl
  } = useContext(DoctorContext);

  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  // FETCH PROFILE
  useEffect(() => {
    if (doctorToken) {
      getProfileData();
    }
  }, [doctorToken]);

  // UPDATE PROFILE
  const updateDoctorProfile = async () => {
    try {
      const formData = new FormData();

      formData.append('fees', docData.fees);
      formData.append('address', JSON.stringify(docData.address));
      formData.append('availability', docData.availability);

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        formData,
        { headers: { doctortoken: doctorToken } }
      );

      if (data.success) {
        toast.success(data.message);
        await getProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!docData) return null;

  return (
    <div className="max-w-lg mx-auto mt-6 p-8 border border-gray-600 rounded-xl shadow-xl text-sm bg-inputBg">

      {/* PROFILE IMAGE */}
      <div className="flex flex-col items-center">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div className="relative">
              <img
                className="w-36 h-36 rounded-full object-cover opacity-80 bg-bg"
                src={image ? URL.createObjectURL(image) : docData.image}
                alt="profile"
              />
            </div>
            <input
              type="file"
              hidden
              id="image"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 rounded-full object-cover bg-bg"
            src={docData.image}
            alt="profile"
          />
        )}

        <p className="text-2xl font-semibold mt-4 text-text">
          {docData.name}
        </p>
        <p className="text-sm text-textMuted">
          {docData.speciality}
        </p>
      </div>

      <hr className="my-5 border-gray-500" />

      {/* BASIC INFO */}
      <p className="text-textMuted mb-3">
        BASIC INFORMATION
      </p>

      <div className="grid grid-cols-[1fr_3fr] gap-y-2 text-textSecondary">

        <p className="font-medium">Degree:</p>
        <p>{docData.degree}</p>

        <p className="font-medium">Experience:</p>
        <p>{docData.experience}</p>

        <p className="font-medium">Email:</p>
        <p className="text-blue-400">{docData.email}</p>

      </div>

      <hr className="my-5 border-gray-500" />

      {/* PROFESSIONAL INFO */}
      <p className="text-textMuted mb-3">
        PROFESSIONAL DETAILS
      </p>

      <div className="grid grid-cols-[1fr_3fr] gap-y-3 text-textSecondary">

        <p className="font-medium">Consultation Fees:</p>
        {isEdit ? (
          <input
            type="number"
            className="border px-2 py-1 rounded-full bg-transparent"
            value={docData.fees}
            onChange={e =>
              setDocData(prev => ({
                ...prev,
                fees: e.target.value
              }))
            }
          />
        ) : (
          <p>{currency} {docData.fees}</p>
        )}

        <p className="font-medium">Availability:</p>
        {isEdit ? (
          <input
            type="checkbox"
            checked={docData.availability}
            onChange={e =>
              setDocData(prev => ({
                ...prev,
                availability: e.target.checked
              }))
            }
          />
        ) : (
          <p>{docData.availability ? 'Available' : 'Not Available'}</p>
        )}

        <p className="font-medium">Address:</p>
        {isEdit ? (
          <div>
            <input
              className="w-full mb-1 border px-2 py-1 rounded-full bg-transparent"
              value={docData.address?.line1 || ''}
              onChange={e =>
                setDocData(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line1: e.target.value
                  }
                }))
              }
            />
            <input
              className="w-full border px-2 py-1 rounded-full bg-transparent"
              value={docData.address?.line2 || ''}
              onChange={e =>
                setDocData(prev => ({
                  ...prev,
                  address: {
                    ...prev.address,
                    line2: e.target.value
                  }
                }))
              }
            />
          </div>
        ) : (
          <p className="text-gray-400">
            {docData.address?.line1}<br />
            {docData.address?.line2}
          </p>
        )}

      </div>

      {/* ACTION BUTTON */}
      <div className="mt-8 text-center">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition"
            onClick={updateDoctorProfile}
          >
            Save Changes
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

    </div>
  );
};

export default DoctorProfile;
