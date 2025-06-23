import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/db.js';
import CourseRoutes from './Route/CourseRoutes.js';
import InstanceRoutes from './Route/InstanceRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectDB();

app.use("/api", CourseRoutes);
app.use("/api", InstanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
