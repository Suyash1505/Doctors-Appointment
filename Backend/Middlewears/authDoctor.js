import jwt from "jsonwebtoken";

// DOCTOR AUTHENTICATION MIDDLEWARE
const authDoctor = async (req, res, next) => {
    try {
        const doctorToken = req.headers.doctortoken;

        if (!doctorToken) {
            return res.status(401).json({
                success: false,
                message: "LOGIN REQUIRED"
            });
        }

        const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({
                success: false,
                message: "INVALID TOKEN"
            });
        }

        req.docId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "INVALID TOKEN"
        });
    }
};

export default authDoctor;
