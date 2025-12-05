import express from 'express';
import { addDoctors } from '../Controllers/adminController.js';
import { upload } from '../Middlewears/multer.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor', upload.single('image'), addDoctors)

export default adminRouter;