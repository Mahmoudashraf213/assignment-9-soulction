import { model, Schema } from "mongoose";

// schema
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    otp: { type: String },
  },
  { timestamps: true }
);

// model
export const User = model('User', userSchema);
