import { connect } from "../config/db/connectMysql.js";

const StudentManagementModel = {
  async create({
    student_name,
    student_last_name,
    student_identificacion,
    student_arrival_time,
    student_departure_time,
    student_email,
    student_date,
    student_photo
  }) {
    const [result] = await connect.query(
      `INSERT INTO student_management 
      (student_name, student_last_name, student_identificacion, student_arrival_time, 
       student_departure_time, student_email, student_date, student_photo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_name,
        student_last_name,
        student_identificacion,
        student_arrival_time,
        student_departure_time,
        student_email,
        student_date,
        student_photo
      ]
    );
    return result.insertId;
  },

  async show() {
    const [rows] = await connect.query(`SELECT * FROM student_management ORDER BY student_id`);
    return rows;
  },

  async findById(id) {
    const [rows] = await connect.query(`SELECT * FROM student_management WHERE student_id = ?`, [id]);
    return rows[0];
  },

  async update(id, data) {
    const [result] = await connect.query(
      `UPDATE student_management SET
        student_name = ?, student_last_name = ?, student_identificacion = ?,
        student_arrival_time = ?, student_departure_time = ?, student_email = ?,
        student_date = ?, student_photo = ?
       WHERE student_id = ?`,
      [
        data.student_name,
        data.student_last_name,
        data.student_identificacion,
        data.student_arrival_time,
        data.student_departure_time,
        data.student_email,
        data.student_date,
        data.student_photo,
        id
      ]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await connect.query(`DELETE FROM student_management WHERE student_id = ?`, [id]);
    return result.affectedRows;
  }
};

export default StudentManagementModel;
