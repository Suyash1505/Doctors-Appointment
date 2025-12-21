import validator from "validator";
import bcrypt  from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import { Doctor } from "../Models/doctorsModels.js";
import jwt from 'jsonwebtoken'
import { Appointment } from "../Models/appointmentModels.js";

// API FOR ADDING DOCTORS
const addDoctors =  async (req, res) => {

    try {
        
        const { name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;
        
        // CHECKING FOR ALL DATA TO ADD DOCTORS 
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({
                success : false,
                message : "MISSING DETAILS!!!",
            }) 
        }

        // VALIDATING THE EMAIL FORMAT
        if(!validator.isEmail(email)){
            return res.json({
                success : false,
                message : "ENTRE A VALID EMAIL ID",
            }) 
        }

        // VALIDATE THE PASSWARD
        if(password.length < 8){
            return res.json({
                success : false,
                message : "PLEASE ENTRE A STRONG PASSWORD",
            }) 
        }

        // HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // UPLOAD IMAGE TO CLOUDINARY
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
        const imageUrl = imageUpload.secure_url;

        // SAVE DATA IN OUR DATA BASE
        const doctorsData = {
            name,
            email, 
            image: imageUrl,
            password: hashPassword,
            speciality,
            degree, 
            experience,
            about,
            fees, 
            address : JSON.parse(address),
            date : Date.now()
        }

        const newDoctor = new Doctor(doctorsData);
        await newDoctor.save();

        res.json({
            success : true,
            message : "DOCTOR ADDED TO THE DATABASE",
        }) 
    } 
    catch (error) {
        console.error(error);
        res.json({
            success : false,
            message : error.message
        })
    }
};

// API FOR ADMIN LOGIN
const loginAdmin = async ( req, res ) => {

    try {
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({ key: email + password }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.json({
                success: true,
                token
            })
        }
        else{
            res.json({
                success : false,
                message : "INVALID CREDENTIALS"
            })
        }
    } 
    catch (error) {
        console.error(error);
        res.json({
            success : false,
            message : error.message
        })
    }
}

// API CONTROLLER FUNCTION TO GET ALL THE DATA OF THE DOCTOR'S FOR ADMIN PANNEL
const allDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select('-password');
        res.json({success: true, doctors})
    } 
    catch (error) {
        console.error(error);
        res.json({
            success : false,
            message : error.message
        })
    }
}

// API TO GET ALL APPOINTMENT LIST
const appointmentAdmin = async (req, res) => {
    try {
        const appointments = await Appointment
            .find({})
            .populate("userId", "name email phone dob gender image")
            .populate("docId", "name speciality fees image");

        res.json({
            success: true,
            appointments
        });
    } 
    catch (error) {
        console.error(error);
        res.json({
            success : false,
            message : error.message
        });
    }
};

// API FOR ADMIN APPOINTMENT CANCELLATION
const appointmentCancelled = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData) {
      return res.json({
        success: false,
        message: "APPOINTMENT NOT FOUND"
      });
    }

    // ADMIN CAN CANCEL ANY APPOINTMENT (NO userId CHECK)

    await Appointment.findByIdAndUpdate(
      appointmentId,
      { cancelled: true }
    );

    // MAKE SLOT AVAILABLE AGAIN
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await Doctor.findById(docId);

    if (doctorData?.slots_booked?.[slotDate]) {
      doctorData.slots_booked[slotDate] =
        doctorData.slots_booked[slotDate].filter(
          time => time !== slotTime
        );

      await Doctor.findByIdAndUpdate(docId, {
        slots_booked: doctorData.slots_booked
      });
    }

    res.json({
      success: true,
      message: "APPOINTMENT CANCELLED BY ADMIN"
    });
  } 
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};



export {
    addDoctors, 
    loginAdmin, 
    allDoctors,
    appointmentAdmin,
    appointmentCancelled
};