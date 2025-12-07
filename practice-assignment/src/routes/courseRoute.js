import express from "express";
import * as courseController from "../controllers/courseController.js";
import {removeStudentFromCourse} from "../controllers/courseController.js";

const router = express.Router();

router.get('/67130500074/api/courses', courseController.getAllCourses);
router.get('/67130500074/api/subjects/:courseId/students', courseController.getStudentById);
router.post('/67130500074/api/students/:studentId/courses', courseController.createCourseStudent);
router.delete('/67130500074/api/students/:studentId/courses/:courseId',courseController.removeStudentFromCourse)
export default router;