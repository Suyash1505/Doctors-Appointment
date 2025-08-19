import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGOBD_URI}/prescripto`)

        console.log(`MONGO_DB CONNECTED !! DB HOST: 
            ${connectionInstance.connection.host}`);
        
    } 
    catch (error) {
        console.log("MONGO_DB CONNECTION ERROR : ",error);    
    }
}