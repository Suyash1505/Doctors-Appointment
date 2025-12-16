import jwt from "jsonwebtoken";

// USER AUTHENTICATION MIDDLEWARE
const authUser = async (req, res, next) => {

    try {

        const token = req.headers.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "LOGIN REQUIRED"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        next();

    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "INVALID TOKEN"
        })
    }
}

export default authUser;
