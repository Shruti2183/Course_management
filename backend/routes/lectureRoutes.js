import express from "express";
import {createLecture, getLectures, getInstructorLectures} from '../controllers/lecture.controller.js'
import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/auth.js";

const router = express.Router();

router.post('/', auth, admin, createLecture);
router.get('/', auth, admin, getLectures);
router.get('/my-lectures', auth, getInstructorLectures);

export default router