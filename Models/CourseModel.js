import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    courseId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
const Course = mongoose.model('Course', courseSchema);

export default Course;