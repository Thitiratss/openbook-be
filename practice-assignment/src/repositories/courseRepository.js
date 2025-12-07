import prisma from '../dataAccess/prisma.js';

export async function findAllCourses(includeSubject = false, { page = 1, pageSize = 10 } = {}) {
    const total = await prisma.courses.count()

    const data = await prisma.courses.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { id: 'asc' },
        include: { subjects: includeSubject ? true : false },
    });
    return {
        data,
        pageInfo: {
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        }
    }
}

export async function findStudentById(courseId) {
    const students = await prisma.students.findMany({
        where: {
            course_student: {
                some: { course_id: courseId }
            }
        },
        // เลือกเฉพาะฟิลด์ที่ต้องการให้ตรงกับภาพ (id, name)
        select: {
            id: true,
            name: true
        }
    });
    return students.map(student => ({
        course_id: courseId,
        id: student.id,
        name: student.name,
    }))
}

export async function createCourseStudent(studentId, courseId, grade) {
    return await prisma.course_student.create({
        data: {
            student_id: studentId,
            course_id: courseId,
            grade: grade
        }
    })
}

export async function deleteCourseStudent(studentId, courseId) {
    return await prisma.course_student.delete({
        where: {
            course_id_student_id: {
                course_id: courseId,
                student_id: studentId
            }
        }
    })
}