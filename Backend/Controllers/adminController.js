import ApiError from "../Utils/apiError.js";
import asyncHandler from "../Utils/asyncHandler.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import { Doctor } from "../Models/doctorsModels.js";
import ApiResponse from "../Utils/apiResponse.js";

// API FOR ADDING DOCTORS
const addDoctors = asyncHandler( async (req, res) => {

    // STEP: 1 GET USER DETAILS FROM FRONTEND
    const { name, email, password, speciality, degree, experience, about, fees, address} = req.body;
    const imageFile = req.file

    // STEP: 2 VALIDATION NOT - EMPTY
    if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
        throw new ApiError(401, "All fields are required");
    }

    if (!imageFile) {
        throw new ApiError(400, "Doctor profile image is required");
    }

    // STEP: 3 VALIDATING THE FORMAT OR EMAIL
    if(!validator.isEmail(email)){
        throw new ApiError(400, "Please entre a valid email")
    }

    // VALIDATING STRONG PASSWORD
    if(password.length < 8 ){
        throw new ApiError(403, "Your password is too weak.")
    }

    // HASHING DOCTORS PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // UPLOAD IMAGE IN CLOUDINARY
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
    const imageURL = imageUpload.secure_url;

    // PARSE ADDRESS 
    let parsedAddress;
    try {
        parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
    } 
    catch (err) {
        throw new ApiError(400, "Invalid address format");
    }
    
    const doctorData = {
        name,
        email, 
        image: imageURL,
        password: hashedPassword,
        speciality,
        degree, 
        experience,
        about,
        fees,
        address: parsedAddress,
        date: Date.now(),
    }

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    // RETURN RESPONSE
    return res.status(201)
    .json(
        new ApiResponse(201, doctorData, "Doctor Register Successfully")
    )
})

export {addDoctors};