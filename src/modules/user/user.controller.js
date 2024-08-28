import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../../../db/models/user.model.js";
import { AppError } from "../../utils/appError.js";
import { sendEmail } from "../../utils/sendEmail.js";

const JWT_SECRET = "your_jwt_secret"; // Use environment variable for production

// sign up
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return next(new AppError("User already exists", 409));
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new User({ username, email, password: hashedPassword });
    const createdUser = await user.save();

    if (!createdUser) {
      return next(new AppError("Failed to create user", 500));
    }

    // Send email logic here (e.g., OTP generation)
    await sendEmail(email, "Verify your account", "<b>Welcome!</b>");

    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: createdUser,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

// login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
