import express from "express";
import {register, login, getInstructors} from '../controllers/user.controller.js'
import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/auth.js";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/instructors', auth, admin, getInstructors);

export default router