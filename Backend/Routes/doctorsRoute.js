import express from 'express'
import { appointmentCancel, appointmentComplete, doctorDashboard, doctorLogin, doctorsAppointment, doctorsList, getDoctorProfile, updateDoctorProfile } from '../Controllers/doctorController.js';
import authDoctor from '../Middlewears/authDoctor.js';
import { upload } from '../Middlewears/multer.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorsList);
doctorRouter.post('/login', doctorLogin);
doctorRouter.get('/appointments', authDoctor, doctorsAppointment);

doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);

doctorRouter.get('/dashboard', authDoctor, doctorDashboard);

doctorRouter.get('/get-profile', authDoctor, getDoctorProfile);
doctorRouter.post('/update-profile', authDoctor, upload.single('image'), updateDoctorProfile);

export default doctorRouter;           