import express from'express'
import connectDB from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import lectureRoutes from './routes/lectureRoutes.js'
import cookieParser from 'cookie-parser'

const app = express();

connectDB;

app.use(express.json());
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

