import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourseById } from '../Controller/courseController.js';

const router = express.Router();
//  Create a new course
router.post('/courses', createCourse);

//  Get all courses (with prerequisites)
router.get('/courses', getAllCourses);

//  Get a single course by ID (with prerequisites)
router.get('/courses/:id', getCourseById);

//  Delete a course by ID (with dependency check)
router.delete('/courses/:id', deleteCourse);

export default router;
