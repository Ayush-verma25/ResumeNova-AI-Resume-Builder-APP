import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// controllers for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if the reqired fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check if the email is already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // return success message and token
    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controllers for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    // check if the password is correct
    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    // return success message and token
    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controllers for getting user by id
// GET: /api/users/data
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    // check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // return user
    user.password = undefined;

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for getting user resumes
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    // return user resumes
    const resumes = await Resume.find({ userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
