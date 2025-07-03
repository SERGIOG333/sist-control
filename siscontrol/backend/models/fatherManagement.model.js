import { connect } from "../config/db/connectMysql.js";

const FatherManagementModel = {
  async create({ father_name, father_last_name, father_email, father_number, student_fk }) {
    const [result] = await connect.query(
      `INSERT INTO father_management 
      (father_name, father_last_name, father_email, father_number, student_fk) 
      VALUES (?, ?, ?, ?, ?)`,
      [father_name, father_last_name, father_email, father_number, student_fk]
    );
    return result.insertId;
  },

  async show() {
    const [rows] = await connect.query(`SELECT * FROM father_management ORDER BY father_id`);
    return rows;
  },

  async findById(id) {
    const [rows] = await connect.query(`SELECT * FROM father_management WHERE father_id = ?`, [id]);
    return rows[0];
  },

  async update(id, { father_name, father_last_name, father_email, father_number, student_fk }) {
    const [result] = await connect.query(
      `UPDATE father_management SET 
      father_name = ?, father_last_name = ?, father_email = ?, father_number = ?, student_fk = ?
      WHERE father_id = ?`,
      [father_name, father_last_name, father_email, father_number, student_fk, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await connect.query(`DELETE FROM father_management WHERE father_id = ?`, [id]);
    return result.affectedRows;
  }
};

export default FatherManagementModel;
