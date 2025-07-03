import UserModel from '../models/UserModel.js';
import { encryptPassword, comparePassword } from '../library/appBcrypt.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserController {

  async register(req, res) {
    try {
      const { Users_usuario, Users_password, User_status_fk, Role_fk } = req.body;

      if (!Users_usuario || !Users_password || !User_status_fk || !Role_fk) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      const passwordHash = await encryptPassword(Users_password);

      const result = await UserModel.create({
        Users_usuario,
        passwordHash,
        User_status_fk,
        Role_fk
      });

      res.status(201).json({
        message: 'User created successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const { Users_usuario, Users_password } = req.body;

      if (!Users_usuario || !Users_password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const user = await UserModel.findByUsername(Users_usuario);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await comparePassword(Users_password, user.Users_password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        {
          id: user.Users_id,
          username: user.Users_usuario,
          role: user.Role_fk
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token
      });

    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const result = await UserModel.show();

      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'No users found' });
      }

      res.status(200).json({
        message: 'Users retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in show:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const Users_id = req.params.id;
      const { Users_usuario, Users_password, User_status_fk, Role_fk } = req.body;

      if (!Users_id || !Users_usuario || !Users_password || !User_status_fk || !Role_fk) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      const passwordHash = await encryptPassword(Users_password);

      const result = await UserModel.update(Users_id, {
        Users_usuario,
        Users_password: passwordHash,
        User_status_fk,
        Role_fk
      });

      if (!result || result === 0) {
        return res.status(404).json({ error: 'User not found or not updated' });
      }

      res.status(200).json({
        message: 'User updated successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in update:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const Users_id = req.params.id;

      if (!Users_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const result = await UserModel.delete(Users_id);

      if (!result || result === 0) {
        return res.status(404).json({ error: 'User not found or already deleted' });
      }

      res.status(200).json({
        message: 'User deleted successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in delete:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req, res) {
    try {
      const Users_id = req.params.id;

      if (!Users_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const result = await UserModel.findById(Users_id);

      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({
        message: 'User retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in findById:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
