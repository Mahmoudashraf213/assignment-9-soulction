import { AppError } from "../utils/appError.js";

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      next(new AppError(error.message, error.statusCode || 500));
    });
  };
};

export const globalErrorHandling = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    success: false,
  });
};
