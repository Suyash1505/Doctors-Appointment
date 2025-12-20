import express from 'express';
import { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, vefifyRazorpay } from '../Controllers/userController.js';
import authUser from '../Middlewears/authUser.js';
import { upload } from '../Middlewears/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/appointment-cancelled', authUser, cancelAppointment);

userRouter.post('/payment-razorpay', authUser, paymentRazorpay);
userRouter.post('/verify-razorpay', authUser, vefifyRazorpay);

export default userRouter;