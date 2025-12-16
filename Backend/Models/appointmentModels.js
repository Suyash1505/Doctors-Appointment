import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },

    slotDate: {
        type: String,
        required: true
    },

    slotTime: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    cancelled: {
        type: Boolean,
        default: false
    },

    payment: {
        type: Boolean,
        default: false
    },

    isCompleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export const Appointment =
    mongoose.models.Appointment ||
    mongoose.model("Appointment", appointmentSchema);
