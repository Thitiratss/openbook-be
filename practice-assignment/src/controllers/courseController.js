import * as courseService from '../services/courseService.js'

export async function getAllCourses(req, res){
    try{
        const { page, pageSize } = req.query
        const includeSubject = req.query.includeSubject === 'true';

        const result = await courseService.getAllCourses(includeSubject, {
            page: parseInt(page) || 1,
            pageSize: parseInt(pageSize) || 10,
        });
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function getStudentById(req, res){
    try {
        const { courseId } = req.params;
        const result = await courseService.getStudentsById(parseInt(courseId));
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message})
    }
}

export async function createCourseStudent(req, res){
    try{
        const { studentId } = req.params;
        const { course_id, grade } = req.body

        const result = await courseService.createStudentToCourse(
            parseInt(studentId),
            parseInt(course_id),
            parseFloat(grade)
        )
        res.status(201).json(result)
    } catch (error){
        res.status(error.status || 500).json({ error: error.message });
    }
}

export async function removeStudentFromCourse(req, res){
    try{
        const { studentId, courseId } = req.params;

        await courseService.removeCourseStudent(
            parseInt(studentId),
            parseInt(courseId),
        )
        res.json({ message: `Removed student ${studentId} from course ${courseId} successfully` })
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
}