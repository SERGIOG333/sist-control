import { connect } from '../config/db/connectMysql.js';

class RoleModel {

  static async create({ Role_name }) {
    try {
      const sqlQuery = "INSERT INTO role (Role_name) VALUES (?);";
      const [result] = await connect.query(sqlQuery, [Role_name]);
      return result.insertId;
    } catch (error) {
      return [0];
    }
  }

  static async show() {
    try {
      const sqlQuery = "SELECT * FROM role ORDER BY Role_id";
      const [result] = await connect.query(sqlQuery);
      return result;
    } catch (error) {
      return [0];
    }
  }

  static async update(Role_id, { Role_name }) {
    try {
      const sqlQuery = "UPDATE role SET Role_name = ? WHERE Role_id = ?;";
      const [result] = await connect.query(sqlQuery, [Role_name, Role_id]);
      return result.affectedRows === 0 ? [0] : result.affectedRows;
    } catch (error) {
      return [0];
    }
  }

  static async delete(Role_id) {
    try {
      const sqlQuery = "DELETE FROM role WHERE Role_id = ?";
      const [result] = await connect.query(sqlQuery, [Role_id]);
      return result.affectedRows === 0 ? [0] : result.affectedRows;
    } catch (error) {
      return [0];
    }
  }

  static async findById(Role_id) {
    try {
      const sqlQuery = "SELECT * FROM role WHERE Role_id = ?";
      const [result] = await connect.query(sqlQuery, [Role_id]);
      return result;
    } catch (error) {
      return [0];
    }
  }

}

export default RoleModel;
