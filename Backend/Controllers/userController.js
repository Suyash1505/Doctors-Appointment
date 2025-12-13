import validator from 'validator';
import bcrypt from 'bcrypt';
import { User } from '../Models/userModels.js';
import jwt from 'jsonwebtoken';

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

export { registerUser, loginUser };