import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connection.on( 'connected', () => 
            console.log("DATA BASE CONNECTED")
        )
        await mongoose.connect(`${process.env.MONGODB_URI}/cureline`)
        console.log("MONGO_URI => ", process.env.MONGODB_URI);

    } 
    catch (error) {
        console.log("MONGO_DB CONNECTION ERROR : ",error);    
    }
}