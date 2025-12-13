import { Doctor } from "../Models/doctorsModels.js";

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
}
export { changeAvailability, doctorsList };
