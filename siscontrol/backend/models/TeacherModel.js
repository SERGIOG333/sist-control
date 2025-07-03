import { connect } from '../config/db/connectMysql.js';

class TeacherModel {

  static async create({ teacher_name, teacher_last_name, teacher_identificacion, teacher_course_assigned, teacher_email, Users_fk }) {
    try {
      const sqlQuery = `
        INSERT INTO teacher (teacher_name, teacher_last_name, teacher_identificacion, teacher_course_assigned, teacher_email, Users_fk)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      const [result] = await connect.query(sqlQuery, [
        teacher_name,
        teacher_last_name,
        teacher_identificacion,
        teacher_course_assigned,
        teacher_email,
        Users_fk
      ]);
      return result.insertId;
    } catch (error) {
      return [0];
    }
  }

  static async show() {
    try {
      const sqlQuery = "SELECT * FROM teacher ORDER BY teacher_id";
      const [result] = await connect.query(sqlQuery);
      return result;
    } catch (error) {
      return [0];
    }
  }

  static async update(teacher_id, { teacher_name, teacher_last_name, teacher_identificacion, teacher_course_assigned, teacher_email, Users_fk }) {
    try {
      const sqlQuery = `
        UPDATE teacher SET 
        teacher_name = ?, 
        teacher_last_name = ?, 
        teacher_identificacion = ?, 
        teacher_course_assigned = ?, 
        teacher_email = ?, 
        Users_fk = ?
        WHERE teacher_id = ?;
      `;
      const [result] = await connect.query(sqlQuery, [
        teacher_name,
        teacher_last_name,
        teacher_identificacion,
        teacher_course_assigned,
        teacher_email,
        Users_fk,
        teacher_id
      ]);
      return result.affectedRows === 0 ? [0] : result.affectedRows;
    } catch (error) {
      return [0];
    }
  }

  static async delete(teacher_id) {
    try {
      const sqlQuery = "DELETE FROM teacher WHERE teacher_id = ?";
      const [result] = await connect.query(sqlQuery, [teacher_id]);
      return result.affectedRows === 0 ? [0] : result.affectedRows;
    } catch (error) {
      return [0];
    }
  }

  static async findById(teacher_id) {
    try {
      const sqlQuery = "SELECT * FROM teacher WHERE teacher_id = ?";
      const [result] = await connect.query(sqlQuery, [teacher_id]);
      return result;
    } catch (error) {
      return [0];
    }
  }

}

export default TeacherModel;
