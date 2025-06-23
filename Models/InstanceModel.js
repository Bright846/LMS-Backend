import mongoose from "mongoose";

const instanceSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    semester: { type: Number, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
}, { timestamps: true });

const Instance = mongoose.model('Instance', instanceSchema);

export default Instance;