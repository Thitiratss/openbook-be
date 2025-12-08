
// 1) ดึงนักเรียนทั้งหมดที่อยู่ใน courseId
export async function findStudentsInCourse(courseId) {
    return await prisma.students.findMany({
        where: {
            course_student: {
                some: { course_id: courseId }
            }
        },
        select: {
            id: true,
            name: true,
        }
    });
}

// 2) เพิ่มนักเรียนเข้า course
export async function addStudentToCourse(studentId, courseId, grade) {
    return await prisma.course_student.create({
        data: {
            student_id: studentId,
            course_id: courseId,
            grade: grade
        }
    });
}

// 3) ลบนักเรียนออกจาก course
export async function removeStudentFromCourse(studentId, courseId) {
    return await prisma.course_student.delete({
        where: {
            course_id_student_id: {
                course_id: courseId,
                student_id: studentId,
            }
        }
    });
}

// 4) ดึง course ทั้งหมดที่ studentId ลงเรียนอยู่
export async function findCoursesOfStudent(studentId) {
    return await prisma.courses.findMany({
        where: {
            course_student: {
                some: { student_id: studentId }
            }
        },
        include: {
            subjects: true     // ตัวอย่าง include หากมี relation อื่น
        }
    });
}


// Customer Error Example:
async function b(value) {
    if (value > 0) {
        return ++value;
    }
    try {
        const data = await fs.readFile('data.txt', 'utf8');
        return data;
    } catch (e) {
        const err =  new Error('File data.txt not found');
        err.code = 'FILE_NOT_FOUND';
        err.status = 404;
        throw err;
    }
}
