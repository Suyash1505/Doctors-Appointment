import { Doctor } from "../Models/doctorsModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Appointment } from "../Models/appointmentModels.js";
import { v2 as cloudinary } from "cloudinary";

// API TO CHECK THE AVAILABILITY OF DOCTOR
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await Doctor.findById(docId);
    if (!docData) {
      return res.json({
        success: false,
        message: "Doctor not found"
      });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      docId,
      { availability: !docData.availability },
      { new: true }
    );

    res.json({
      success: true,
      message: "Availability changed",
      availability: updatedDoctor.availability
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// API TO GET ALL DOCTORS LIST FOR FRONTEND
const doctorsList = async (req, res) => {
  try {
      
      const doctors = await Doctor.find({}).select(['-password', '-email']);
      res.json({
          success: true,
          doctors
      })
  } 
  catch (error) {

    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// API FOR DOCTOR LOGIN
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({email});

    if(!doctor){
      return res.json({
        success: false,
        message: 'DOCTOR DOES NOT EXIST'
      })
    }

    const isMatch = await bcrypt.compare(password, doctor.password)
    if(isMatch){
      const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
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
    });
  }
};

// API TO GET DOCTOR'S APPOINTMENTS FOR DOCTOR PANEL
const doctorsAppointment = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await Appointment
      .find({ docId })
      .populate("userId", "name email phone dob gender image");

    res.json({
      success: true,
      appointments
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

// API TO MARK APPOINTMENT COMPLETED FOR DOCTORS PANNEL
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await Appointment.findById(appointmentId);

    if(appointmentData && appointmentData.docId.toString() === docId){
      await Appointment.findByIdAndUpdate(appointmentId, {isCompleted: true})
      return res.json({
        success: true,
        message: 'APPOINTMENT COMPLETED'
      })
    }
    else{
      return res.json({
        success: false,
        message: 'APPOINTMENT COMPLETION FAILED'
      })
    }
  } 
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// API TO CANCLE APPOINTMENT  FOR DOCTORS PANNEL
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.docId;

    const appointmentData = await Appointment.findById(appointmentId);
    
    if(appointmentData && appointmentData.docId.toString() === docId){
      await Appointment.findByIdAndUpdate(appointmentId, {cancelled: true})
      return res.json({
        success: true,
        message: 'APPOINTMENT CANCELED'
      })
    }
    else{
      return res.json({
        success: false,
        message: 'APPOINTMENT CANCELLATION FAILED'
      })
    }
  } 
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// API TO GET DASHBOARD DATA FOR DOCTORS PANNEL
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;
    const appointments = await Appointment.find({ docId });

    let earnings = 0;
    appointments.map( (item) => {
      if(item.isCompleted || item.payment){
        earnings += item.amount;
      }
    })

    // UNIQUE PATIENT COUNT
    const patientsSet = new Set();
    appointments.forEach(item => {
      patientsSet.add(item.userId.toString());
    });

    const latestAppointments = await Appointment
    .find({ docId })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("userId", "name image")
    .populate("docId", "name image");

    const dashboardData = {
      earnings,
      appointments: appointments.length,
      patients: patientsSet.size,
      latestAppointments
    };

    res.json({
        success: true,
        dashboardData
    });
  } 
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
}

// API TO GET THE DOCTOR PROFILE DATA
const getDoctorProfile = async (req, res) => {
  try {  
    const docId = req.docId;
    const docData = await Doctor.findById(docId).select('-password');

    res.json({
      success: true,
      docData
    })
  } 
  catch (error) {
    console.log(error);
    res.json({
        success: false,
        message: error.message
    }) 
  }
};

// API TO UPDATA DOCTOR'S PROFILE
const updateDoctorProfile = async (req, res) => {

  try {
    const docId = req.docId;
    const { fees, address, availability } = req.body;
    const imageFile = req.file;

      if(!fees || !address || !availability === undefined){
          return res.json({
              success : false,
              message : "DATA MISSINGE"
          })
      }

      await Doctor.findByIdAndUpdate(docId, {
        fees,
        address: address ? JSON.parse(address) : {},
        availability
      });

      if(imageFile){
        // UPLOAD IMAGE TO CLOUDINARY
        const imageUpload = await cloudinary.uploader.upload(
          imageFile.path,
          { resource_type: 'image' }
        );

        const imageUrl = imageUpload.secure_url;
        await Doctor.findByIdAndUpdate(docId, { image: imageUrl });
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
};

export { 
  changeAvailability, 
  doctorsList,
  doctorLogin,
  doctorsAppointment,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  getDoctorProfile,
  updateDoctorProfile
};
