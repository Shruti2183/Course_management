import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

export const auth = async (req, res, next) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the decoded ID
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export const admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required.' });
  }
  next();
};
