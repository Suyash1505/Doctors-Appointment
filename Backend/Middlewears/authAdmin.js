import jwt from "jsonwebtoken";

// ADMIN AUTHENTICATION MIDDLEWEAR
const authAdmin = async (req, res, next) => {

    try {
        
        // ADMIN TOKEN
        const { adminToken } = req.headers
        if(!adminToken){
            return res.json({
                success: false,
                message : 'NOT AUTHORISED LOGIN AGAIN!'
            })
        }

        // DECODE THE TOKEN
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

        if (decoded.key !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "NOT AUTHORISED LOGIN AGAIN!"
            });
        }

        next();
    } 
    catch (error) {
        console.error(error);
        res.json({
            success : false,
            message : error.message
        })
    }
}

export default authAdmin;