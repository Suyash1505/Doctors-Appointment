import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './Config/mongoDB.js';
import uploadOnCloudinary from './Config/cloudinary.js';
import adminRouter from './Routes/adminRoute.js';
import doctorRouter from './Routes/doctorsRoute.js';

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;

// DB CONNECTION
connectDB().catch( (error) => {
    console.log("FAIL TO CONNECTO DATABASE :", error);
    process.exit(1);
})

uploadOnCloudinary();

// MIDDLEWEARS
app.use(express.json());
app.use(cors());


// API ENDPOINT
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)

app.listen( port, () => {
    console.log(`SERVER STARTED ON http://localhost:${port}`);
    
})


app.get('/', (req, res) => {
    res.send("API WORKING...");
})

