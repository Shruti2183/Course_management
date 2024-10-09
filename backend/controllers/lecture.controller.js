import Lecture from '../models/lecture.js';
import { asyncHandler } from "../asynchandler.js";

export const createLecture = asyncHandler(async (req, res) => {
  const { course, date, instructor } = req.body;
  const existingLecture = await Lecture.findOne({ instructor, date });
  if (existingLecture) {
    return res.status(400).json({ error: 'Instructor is not available on this date' });
  }
  const lecture = new Lecture({ course, date, instructor });
  await lecture.save();
  res.status(201).json(lecture);
});

export const getLectures = asyncHandler(async (req, res) => {
  const lectures = await Lecture.find().populate('course instructor');
  res.json(lectures);
});

export const getInstructorLectures = asyncHandler(async (req, res) => {
  const lectures = await Lecture.find({ instructor: req.user._id }).populate('course');
  res.json(lectures);
});

