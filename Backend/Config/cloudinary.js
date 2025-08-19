import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (localFilePath) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    })

    try {
        if(!localFilePath){
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })

        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath);
        return null;    
    }
}

export default uploadOnCloudinary;