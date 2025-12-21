import validator from 'validator';
import bcrypt from 'bcrypt';
import { User } from '../Models/userModels.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { Doctor } from '../Models/doctorsModels.js';
import { Appointment } from '../Models/appointmentModels.js';
import razorpay from 'razorpay'

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
        
        const userId = req.userId;

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

        const userId = req.userId;
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

        const { docId, slotDate, slotTime } = req.body;
        const userId = req.userId;

        // CHECK USER AUTHENTICATION
        if(!userId){
            return res.json({
                success: false,
                message: "USER NOT AUTHENTICATED"
            })
        }

        // FETCH DOCTOR DATA
        const docData = await Doctor.findById(docId);

        if(!docData || !docData.availability){
            return res.json({
                success: false,
                message: "DOCTOR NOT AVAILABLE"
            })
        }

        let slots_booked = docData.slots_booked || {};

        // CHECK SLOT AVAILABILITY
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({
                    success: false,
                    message: "SLOT NOT AVAILABLE"
                })
            }
            else{
                slots_booked[slotDate].push(slotTime);
            }
        }
        else{
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        // CREATE APPOINTMENT
        await Appointment.create({
            userId,
            docId,
            slotDate,
            slotTime,
            amount: docData.fees
        })

        // UPDATE DOCTOR SLOTS
        await Doctor.findByIdAndUpdate(
            docId,
            { slots_booked }
        )

        res.json({
            success: true,
            message: "APPOINTMENT BOOKED SUCCESSFULLY"
        })
    }
    catch(error){

        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// API TO GET THE USER APPOINTMENT
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;

    const appointments = await Appointment
      .find({ userId })
      .populate("docId"); 

    
    const formattedAppointments = appointments.map(app => ({
      ...app._doc,
      docData: app.docId,
      docId: app.docId._id
    }));

    res.json({
      success: true,
      appointments: formattedAppointments
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// API TO CANCLE APPOINTMENT
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData) {
      return res.json({
        success: false,
        message: "APPOINTMENT NOT FOUND"
      });
    }

    // VERIFY USER (ObjectId vs string)
    if (appointmentData.userId.toString() !== userId) {
      return res.json({
        success: false,
        message: "UNAUTHORIZED ACTION"
      });
    }

    // CANCEL APPOINTMENT
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
      message: "APPOINTMENT CANCELLED"
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

// API TO MAKE PAYMENT OF APPOINTMENT USING RAZORPAY
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await Appointment.findById(appointmentId);

        if(!appointmentData || appointmentData.cancelled){
            return res.json({
                success: false,
                message: "APPOINTMENT CANCELLED OR NOT FOUND"
            });
        }

        // CREATING OPTIONS FOR RAZORPAY PAYMENT
        const options = {
            amount : appointmentData.amount * 100,
            currency : process.env.CURRENCY,
            receipt : appointmentId
        }

        // CREATION OF AN ORDER
        const order = await razorpayInstance.orders.create(options);
        res.json({
            success: false,
            order
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

// API TO VERIFY RAZORPAY
const vefifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        console.log(orderInfo);
        if(orderInfo.status === 'paid'){
            await Appointment.findByIdAndUpdate(orderInfo.receipt, {payment: true})
            res.json({
                success: true,
                message : "PAYMENT SUCCESSFULL"
            })
        }
        else{
            res.json({
                success : false,
                message : "PAYMENT FAILED"
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
}
export { registerUser, 
    loginUser, 
    getProfile, 
    updateProfile, 
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    vefifyRazorpay
};