import jwt from "jsonwebtoken";

// ADMIN AUTHENTICATION MIDDLEWARE
const authAdmin = async (req, res, next) => {
  try {
    const adminToken = req.headers.admintoken;

    if (!adminToken) {
      return res.json({
        success: false,
        message: "NOT AUTHORISED LOGIN AGAIN!"
      });
    }

    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);

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

export default authAdmin;
