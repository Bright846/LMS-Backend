import express from 'express';
import { createInstance, deleteInstance, getInstanceDetail, getInstancesByYearSemester } from '../Controller/instanceController.js';


const router = express.Router();
//  Create a new course instance
router.post('/instances', createInstance);

//  List course instances by year and semester
router.get('/instances/:year/:semester', getInstancesByYearSemester);

//  Get details of a specific course instance
router.get('/instances/:year/:semester/:courseId', getInstanceDetail);

//  Delete a specific course instance
router.delete('/instances/:year/:semester/:courseId', deleteInstance);

export default router;
