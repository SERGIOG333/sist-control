import RoleModel from '../models/role.model.js';

class RoleController {

  async register(req, res) {
    try {
      const { Role_name } = req.body;

      if (!Role_name) {
        return res.status(400).json({ error: 'Required field "Role_name" is missing' });
      }

      const roleId = await RoleModel.create({ Role_name });

      res.status(201).json({ 
        message: 'Role created successfully',
        data: roleId 
      });

    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const roles = await RoleModel.show();

      if (!roles || roles.length === 0) {
        return res.status(404).json({ error: 'No roles found' });
      }

      res.status(200).json({ 
        message: 'Roles retrieved successfully',
        data: roles 
      });

    } catch (error) {
      console.error('Error in show:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const { Role_name } = req.body;
      const Role_id = req.params.id;

      if (!Role_id || !Role_name) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      const result = await RoleModel.update(Role_id, { Role_name });

      if (!result || result === 0) {
        return res.status(404).json({ error: 'Role not found or not updated' });
      }

      res.status(200).json({ 
        message: 'Role updated successfully',
        data: result 
      });

    } catch (error) {
      console.error('Error in update:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const Role_id = req.params.id;

      if (!Role_id) {
        return res.status(400).json({ error: 'Role ID is required' });
      }

      const result = await RoleModel.delete(Role_id);

      if (!result || result === 0) {
        return res.status(404).json({ error: 'Role not found or already deleted' });
      }

      res.status(200).json({ 
        message: 'Role deleted successfully',
        data: result 
      });

    } catch (error) {
      console.error('Error in delete:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req, res) {
    try {
      const Role_id = req.params.id;

      if (!Role_id) {
        return res.status(400).json({ error: 'Role ID is required' });
      }

      const role = await RoleModel.findById(Role_id);

      if (!role || role.length === 0) {
        return res.status(404).json({ error: 'Role not found' });
      }

      res.status(200).json({ 
        message: 'Role retrieved successfully',
        data: role 
      });

    } catch (error) {
      console.error('Error in findById:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new RoleController();
