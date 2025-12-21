import express from 'express';
import { addDoctors, adminDashboard, allDoctors, appointmentAdmin, appointmentCancelled, loginAdmin } from '../Controllers/adminController.js';
import { upload } from '../Middlewears/multer.js';
import authAdmin from '../Middlewears/authAdmin.js';
import { changeAvailability } from '../Controllers/doctorController.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctors)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctor',authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentAdmin);

adminRouter.post('/appointment-cancelled', authAdmin, appointmentCancelled)
adminRouter.get('/dashboard', authAdmin, adminDashboard);

export default adminRouter;