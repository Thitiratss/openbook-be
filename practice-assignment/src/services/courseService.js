import * as courseRepo from '../repositories/courseRepository.js'

export async function getAllCourses(includeSubject = false, pageRequest = {}) {
    return await courseRepo.findAllCourses(includeSubject, pageRequest);
}

export async function getStudentsById(courseId) {
    const course = await courseRepo.findStudentById(courseId);
    if(!course) {
        const err = new Error(`Course not found for ID ${courseId}`);
        err.code = 'NOT_FOUND';
        err.status = 404;
        throw err;
    }
    return course;
}

export async function createStudentToCourse(studentId, courseId, grade) {
    try{
        return await courseRepo.createCourseStudent(studentId, courseId, grade)
    }catch (error) {
        if(error.code === 'P2002'){
            const error = new Error(`Course already exists`);
            error.status = 409
            throw error;
        }
        throw error;
    }
}

export async function removeCourseStudent(studentId, courseId) {
    try{
        return await courseRepo.deleteCourseStudent(studentId, courseId);
    } catch (error){
        if(error.code === 'P2005'){
            const error = new Error(`Registration record not found for Student ${studentId} and Course ${courseId}`);
            error.status = 404;
            throw error;
        }
        throw error;
    }
}