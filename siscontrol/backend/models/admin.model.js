import { connect } from "../config/db/connectMysql.js";

const AdminModel = {
  async create({ admin_name, admin_last_name, admin_email, passwordHash, Users_fk }) {
    const [result] = await connect.query(
      `INSERT INTO admin (admin_name, admin_last_name, admin_email, admin_password, Users_fk)
       VALUES (?, ?, ?, ?, ?)`,
      [admin_name, admin_last_name, admin_email, passwordHash, Users_fk]
    );
    return result.insertId;
  },

  async findByEmail(admin_email) {
    const [rows] = await connect.query(
      `SELECT * FROM admin WHERE admin_email = ?`,
      [admin_email]
    );
    return rows[0]; // Devuelve un único admin si existe
  },

  async show() {
    const [rows] = await connect.query(`SELECT * FROM admin ORDER BY admin_id`);
    return rows;
  },

  async findById(id) {
    const [rows] = await connect.query(`SELECT * FROM admin WHERE admin_id = ?`, [id]);
    return rows[0];
  },

  async update(id, { admin_name, admin_last_name, admin_email, passwordHash, Users_fk }) {
    const [result] = await connect.query(
      `UPDATE admin SET admin_name = ?, admin_last_name = ?, admin_email = ?, admin_password = ?, Users_fk = ?
       WHERE admin_id = ?`,
      [admin_name, admin_last_name, admin_email, passwordHash, Users_fk, id]
    );
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await connect.query(`DELETE FROM admin WHERE admin_id = ?`, [id]);
    return result.affectedRows;
  }
};

export default AdminModel;
