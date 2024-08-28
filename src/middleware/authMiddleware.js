import jwt from 'jsonwebtoken';
import { AppError } from "../utils/appError.js";

const JWT_SECRET = "your_jwt_secret"; // Use environment variable for production

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError("No token provided", 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError("Invalid token", 401));
  }
};
