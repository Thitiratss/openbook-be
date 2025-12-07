# openbook-be

use node 24.11.1
view engine: none

npm install mysql2

npm install prisma@6.19.0 @prisma/client@6.19.0

======================================================
#short-id
npm install short-unique-id
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 10 });
const shortId = uid.rnd();

console.log(shortId);
=======================================================

res.status
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Server Error
========================================================

findMany	ดึงหลายแถว
findUnique / findFirst	ดึงแถวเดียว
create	เพิ่มข้อมูล
update	แก้ไข
delete	ลบ
count	นับจำนวน
========================================================
include
ใช้ตอนอยากดึง ทั้ง object ของ table อื่นที่โยงอยู่
เช่น:
course_student → include → student

select
ใช้ตอนอยาก “เลือกเฉพาะฟิลด์”
เช่น:
student → select → id, name

สมมติเรามีตารางแบบนี้:

students (นักเรียน)
- id
- name

courses (วิชา)
- id
- title

course_student (ตารางเชื่อม)
- student_id
- course_id
- grade
อยากได้รายชื่อนักเรียน (id + name) ที่อยู่ในวิชานั้น
🎉 ตัวอย่าง: ดึงรายชื่อนักเรียนใน course พร้อมชื่อ ด้วย include
const result = await prisma.course_student.findMany({
  where: { course_id: courseId },
  include: {
    student: true,   // << ดึงข้อมูลนักเรียนที่โยงอยู่
  }
});

**การตั้งชื่อ endpoint ให้เป็นมาตรฐาน**
ดึงรายวิชา	GET /courses
เพิ่มนักเรียนเข้า course	POST /courses/:id/students
ลบความสัมพันธ์	DELETE /courses/:courseId/students/:studentId
ดึงรายการตามเงื่อนไข	GET /courses?status=active

GET ทั้งหมด
GET /xxx

GET รายตัว
GET /xxx/:id

POST (สร้างใหม่)
POST /xxx

PUT (อัปเดตทั้งหมด)
PUT /xxx/:id

PATCH (อัปเดตบางส่วน)
PATCH /xxx/:id

DELETE
DELETE /xxx/:id
