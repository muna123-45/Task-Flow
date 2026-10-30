import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    //Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied, Please log in",
      });
    }

    //extract token
    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied, Please log in",
      });
    }

    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //store the authenticated user's ID in the request
    req.user = { userId:decoded.userId };

    next();
  } catch (error) {
    console.error("jwt verification error:",error.message);
    return res.status(401).json({
        success: false,
        message: "Invalid or expired token. please log in again.",
      });
  }
};
