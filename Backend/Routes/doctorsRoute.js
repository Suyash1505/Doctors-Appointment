import express from 'express'
import { appointmentCancel, appointmentComplete, doctorDashboard, doctorLogin, doctorsAppointment, doctorsList } from '../Controllers/doctorController.js';
import authDoctor from '../Middlewears/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorsList);
doctorRouter.post('/login', doctorLogin);
doctorRouter.get('/appointments', authDoctor, doctorsAppointment);

doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);

doctorRouter.get('/dashboard', authDoctor, doctorDashboard);

export default doctorRouter;           