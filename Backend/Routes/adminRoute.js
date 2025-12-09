import express from 'express';
import { addDoctors, loginAdmin } from '../Controllers/adminController.js';
import { upload } from '../Middlewears/multer.js';
import authAdmin from '../Middlewears/authAdmin.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctors)
adminRouter.post('/login', loginAdmin)

export default adminRouter;