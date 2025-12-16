import validator from 'validator';
import bcrypt from 'bcrypt';
import { User } from '../Models/userModels.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { Doctor } from '../Models/doctorsModels.js';
import { Appointment } from '../Models/appointmentModels.js';


// API TO REGISTER USER
const registerUser = async (req, res) => {

    try {
        
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.json({
                success: false,
                message: "MISSING DETAILS!"
            })
        }

        // VALIDATING THE EMAIL FORMAT 
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "INVALID EMAIL!!!"
            })
        }

        // CHECK FOR THE STRONG PASSWORD
        if(password.length < 8){
            return res.json({
                success: false,
                message: "ENTRE A STRONG PASSWORD!"
            })
        }

        // ADD THIS USER IN THE DATABASE

        // STEP: 1 HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // STEP: 2 SAVE THIS HASHED PASSWORD IN THE DATABASE
        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new User(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
        res.json({
            success: true,
            token
        })
    } 
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API FOR THE USER LOGIN
const loginUser = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success: false,
                message: 'USER DOES NOT EXIST'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })
        }
        else{
            res.json({
                success: false,
                message: "INVALID CREDENTIALS"
            })
        }
    } 
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })    
    }
}

// API TO GET THE USER PROFILE DATA
const getProfile = async (req, res) => {

    try {
        
        const userId = req.user.id;

        const userData = await User.findById(userId).select('-password');

        res.json({
            success: true,
            userData
        })
    } 
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        }) 
    }
}

// API TO UPDATA USER PROFILE
const updateProfile = async (req, res) => {

    try {

        const userId = req.user.id;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if(!name || !phone || !dob || !gender){
            return res.json({
                success : false,
                message : "DATA MISSINGE"
            })
        }

        await User.findByIdAndUpdate(userId, {
            name,
            phone,
            address: address ? JSON.parse(address) : {},
            dob,
            gender
        });

        if(imageFile){

            // UPLOAD IMAGE TO CLOUDINARY
            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path,
                { resource_type: 'image' }
            );

            const imageUrl = imageUpload.secure_url;

            await User.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({
            success: true,
            message: "PROFILE UPDATED"
        }) 
    } 
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        }) 
    }
}

// API TO BOOK AN APPOINTMENT
const bookAppointment = async (req, res) => {

    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await Doctor.findById(docId).select('-password');

        if(!docData.availability){
            return res.json({
                success: false,
                message: 'DOCTOR NOT AVAILABLE'
            })
        }

        let slots_booked = docData.slots_booked;

        // CHECK FOR THE SLOTS AVAILABLE
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({
                success: false,
                message: 'SLOT NOT AVAILABLE'
            })
            }{
                slots_booked[slotDate].push(slotTime);
            }
        }
        else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await User.findById(userId).select('-password');
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save()

        // SAVE NEW SLOT DATA IN DOCTORS DATA
        await Doctor.findByIdAndUpdate(docId, {slots_booked})
        res.json({
            success: true,
            message: 'APPOINTMENT BOOKED SUCCESSFULLY'
        })
    } 
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        }) 
    }
}

export { registerUser, 
    loginUser, 
    getProfile, 
    updateProfile, 
    bookAppointment 
};