import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        default: "",
    },
    image:{
        type: String,
        default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemS...",
    },
    address:{
        line1:{
            type: String,
            default: "",
        },
        line2:{
            type: String,
            default: "",
        }
    },
    gender:{
        type: String,
        default: "Not selected",
    },
    dob:{
        type: String,
        default: "Not selected",
    }

}, { timestamps: true });

export const User =
  mongoose.models.User || mongoose.model('User', userSchema);
