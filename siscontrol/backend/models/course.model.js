import { connect } from "../config/db/connectMysql.js";

const CourseModel = {
  async create({
    course_course_name,
    course_description,
    course_assigned_teacher,
    course_assigned_student,
    teacher_fk
  }) {
    const [result] = await connect.query(
      `INSERT INTO course 
      (course_course_name, course_description, course_assigned_teacher, course_assigned_student, teacher_fk)
      VALUES (?, ?, ?, ?, ?)`,
      [
        course_course_name,
        course_description,
        course_assigned_teacher,
        course_assigned_student,
        teacher_fk
      ]
    );
    return result.insertId;
  },

  async show() {
    const [rows] = await connect.query(`SELECT * FROM course ORDER BY course_id`);
    return rows;
  },

  async findById(id) {
    const [rows] = await connect.query(`SELECT * FROM course WHERE course_id = ?`, [id]);
    return rows[0];
  },

  async update(id, data) {
    const [result] = await connect.query(
      `UPDATE course SET
        course_course_name = ?, course_description = ?, 
        course_assigned_teacher = ?, course_assigned_student = ?, teacher_fk = ?
      WHERE course_id = ?`,
      [
        data.course_course_name,
        data.course_description,
        data.course_assigned_teacher,
        data.course_assigned_student,
        data.teacher_fk,
        id
      ]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await connect.query(`DELETE FROM course WHERE course_id = ?`, [id]);
    return result.affectedRows;
  }
};

export default CourseModel;
