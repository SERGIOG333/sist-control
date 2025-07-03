import { connect } from "../config/db/connectMysql.js";

const CourseStudentModel = {
  async create({ course_fk, student_fk }) {
    const [result] = await connect.query(
      `INSERT INTO course_student (course_fk, student_fk) VALUES (?, ?)`,
      [course_fk, student_fk]
    );
    return result.insertId;
  },

  async show() {
    const [rows] = await connect.query(`SELECT * FROM course_student ORDER BY course_student_id`);
    return rows;
  },

  async findById(id) {
    const [rows] = await connect.query(
      `SELECT * FROM course_student WHERE course_student_id = ?`,
      [id]
    );
    return rows[0];
  },

  async update(id, { course_fk, student_fk }) {
    const [result] = await connect.query(
      `UPDATE course_student SET course_fk = ?, student_fk = ? WHERE course_student_id = ?`,
      [course_fk, student_fk, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await connect.query(
      `DELETE FROM course_student WHERE course_student_id = ?`,
      [id]
    );
    return result.affectedRows;
  }
};

export default CourseStudentModel;
