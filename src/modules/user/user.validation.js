import joi from 'joi';

export const signUpVal = joi.object({
  username: joi.string().min(2).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  otp: joi.string().optional(),
});

export const loginVal = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
