import express from "express";
import {createCourse, getCourses} from '../controllers/course.controller.js'
import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/auth.js";
const router = express.Router();

router.post('/', auth, admin, createCourse);
router.get('/', getCourses);

export default router;