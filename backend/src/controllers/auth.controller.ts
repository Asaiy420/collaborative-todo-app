import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { clearTokenCookie, generateToken, setTokenCookie } from "../utils/jwt.js";

export const SignUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "Please provide all the fields" });
      return;
    }

    // check if user already exists

    const existingUser = await User.findOne({ email }).lean();

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // hash the password

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    // generate token
    const token = generateToken(user._id.toString());
    const { password: _, ...userWithoutPassword } = user.toObject();

    setTokenCookie(res, token);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
    return;
  }
};
export const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please provide all the fields" });
      return;
    }

    const user = await User.findOne({ email }).lean();

    if (!user) {
      res.status(400).json({ message: "User not found, Please Signup first!" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password!" });
      return;
    }
    // generate token
    const token = generateToken(user._id.toString());
    const { password: _, ...userWithoutPassword } = user;
    
    setTokenCookie(res, token);

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
    return;
  }
};
export const Logout = async (req: Request, res: Response): Promise<void> => {
  clearTokenCookie(res);
  res.status(200).json({ message: "Logout successful" });
};

//TODO: ADD JWT AUTHENTICATION