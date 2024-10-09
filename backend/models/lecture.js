import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Lecture= mongoose.model('Lecture', LectureSchema);
export default Lecture