import { connect } from '../config/db/connectMysql.js';

class UserModel {
  static async create({ Users_usuario, passwordHash, User_status_fk, Role_fk }) {
    try {
      const sqlQuery = `
        INSERT INTO users (Users_usuario, Users_password, User_status_fk, Role_fk)
        VALUES (?, ?, ?, ?);
      `;
      const [result] = await connect.query(sqlQuery, [
        Users_usuario,
        passwordHash,
        User_status_fk,
        Role_fk
      ]);
      return result.insertId;
    } catch (error) {
      console.error('UserModel.create error:', error);
      return [0];
    }
  }

  static async findByUsername(Users_usuario) {
    try {
      const sqlQuery = "SELECT * FROM users WHERE Users_usuario = ? LIMIT 1;";
      const [result] = await connect.query(sqlQuery, [Users_usuario]);
      return result[0];
    } catch (error) {
      console.error('UserModel.findByUsername error:', error);
      return null;
    }
  }

  static async show() {
    try {
      const [result] = await connect.query("SELECT * FROM users ORDER BY Users_id");
      return result;
    } catch (error) {
      return [0];
    }
  }

  static async update(Users_id, { Users_usuario, Users_password, User_status_fk, Role_fk }) {
    try {
      const sqlQuery = `
        UPDATE users SET 
        Users_usuario = ?, 
        Users_password = ?, 
        User_status_fk = ?, 
        Role_fk = ?
        WHERE Users_id = ?;
      `;
      const [result] = await connect.query(sqlQuery, [
        Users_usuario,
        Users_password,
        User_status_fk,
        Role_fk,
        Users_id
      ]);
      return result.affectedRows === 0 ? [0] : result.affectedRows;
    } catch (error) {
      return [0];
    }
  }

  static async delete(Users_id) {
    try {
      const [result] = await connect.query("DELETE FROM users WHERE Users_id = ?", [Users_id]);
      return result.affectedRows === 0 ? [0] : result.affectedRows;
    } catch (error) {
      return [0];
    }
  }

  static async findById(Users_id) {
    try {
      const [result] = await connect.query("SELECT * FROM users WHERE Users_id = ?", [Users_id]);
      return result;
    } catch (error) {
      return [0];
    }
  }
}

export default UserModel;
