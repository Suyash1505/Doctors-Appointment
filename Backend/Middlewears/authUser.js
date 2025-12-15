import jwt from "jsonwebtoken";

// USER AUTHENTICATION MIDDLEWARE
const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({
        success: false,
        message: "NOT AUTHORISED LOGIN AGAIN!"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    
    if (
      decoded.key !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "NOT AUTHORISED LOGIN AGAIN!"
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "NOT AUTHORISED LOGIN AGAIN!"
    });
  }
};

export default authUser;
