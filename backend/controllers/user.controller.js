import User from '../models/user.js'
import { asyncHandler } from "../asynchandler.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

 export const register = asyncHandler(async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const user = new User({ username, password, isAdmin });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});


export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate a token
  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '1h',  // Token expiration (optional)
  });

  // Set the token as a cookie
  res.cookie('token', token, {
    httpOnly: true,      // Cookie can't be accessed from client-side JavaScript
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
    maxAge: 60 * 60 * 1000,  // Cookie expires in 1 hour
    sameSite: 'Strict'   // Helps mitigate CSRF attacks
  });

  // Respond with success
  res.json({ message: 'Login successful' });
});

export const getInstructors = asyncHandler(async (req, res) => {
  const instructors = await User.find({ isAdmin: false }).select('-password');
  res.json(instructors);
});

