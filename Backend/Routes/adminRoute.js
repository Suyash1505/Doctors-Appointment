import express from 'express';
import { addDoctors, allDoctors, loginAdmin } from '../Controllers/adminController.js';
import { upload } from '../Middlewears/multer.js';
import authAdmin from '../Middlewears/authAdmin.js';
import { changeAvailability } from '../Controllers/doctorController.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctors)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctor',authAdmin, allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)

export default adminRouter;