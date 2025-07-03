import { connect } from '../config/db/connectMysql.js';

class UserStatusModel {

  static async create({ User_status_name }) {
    try {
      const sqlQuery = "INSERT INTO user_status (User_status_name) VALUES (?);";
      const [result] = await connect.query(sqlQuery, [User_status_name]);
      return result.insertId;
    } catch (error) {
      return [0];
    }
  }

  static async show() {
    try {
      const sqlQuery = "SELECT * FROM user_status ORDER BY User_status_id";
      const [result] = await connect.query(sqlQuery);
      return result;
    } catch (error) {
      return [0];
    }
  }

  static async update(User_status_id, { User_status_name }) {
    try {
      const sqlQuery = "UPDATE user_status SET User_status_name = ? WHERE User_status_id = ?";
      const [result] = await connect.query(sqlQuery, [User_status_name, User_status_id]);
      return result.affectedRows === 0 ? [0] : result.affectedRows;
    } catch (error) {
      return [0];
    }
  }

  static async delete(User_status_id) {
    try {
      const sqlQuery = "DELETE FROM user_status WHERE User_status_id = ?";
      const [result] = await connect.query(sqlQuery, [User_status_id]);
      return result.affectedRows === 0 ? [0] : result.affectedRows;
    } catch (error) {
      return [0];
    }
  }

  static async findById(User_status_id) {
    try {
      const sqlQuery = "SELECT * FROM user_status WHERE User_status_id = ?";
      const [result] = await connect.query(sqlQuery, [User_status_id]);
      return result;
    } catch (error) {
      return [0];
    }
  }

}

export default UserStatusModel;
