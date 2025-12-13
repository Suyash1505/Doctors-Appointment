import { Doctor } from "../Models/doctorsModels.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await Doctor.findById(docId);

    if (!docData) {
      return res.json({
        success: false,
        message: "DOCTOR NOT FOUND!"
      });
    }

    await Doctor.findByIdAndUpdate(docId, {
      available: !docData.available
    });

    res.json({
      success: true,
      message: "AVAILABILITY CHANGED!"
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export { changeAvailability };
