import { AppError } from "../utils/appError.js";

export const isValid = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errArr = error.details.map(err => err.message);
      return next(new AppError(errArr.join(', '), 400));
    }

    next();
  };
};
