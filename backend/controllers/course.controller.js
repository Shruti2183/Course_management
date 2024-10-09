import Course from "../models/Course.js";
import { asyncHandler } from "../asynchandler.js";

export const createCourse = asyncHandler(async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).json(course);
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});
