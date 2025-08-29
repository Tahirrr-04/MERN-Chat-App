import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Get token from Authorization header -> "Bearer <token>"
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and remove password field
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user; // Attach user object to req
    next();
  } catch (error) {
    console.error(error.message);
    res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};