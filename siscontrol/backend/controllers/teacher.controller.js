import TeacherModel from '../models/TeacherModel.js';

class TeacherController {

  async register(req, res) {
    try {
      const { teacher_name, teacher_last_name, teacher_identificacion, teacher_course_assigned, teacher_email, Users_fk } = req.body;

      if (!teacher_name || !teacher_last_name || !teacher_identificacion || !teacher_course_assigned || !teacher_email || !Users_fk) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      const result = await TeacherModel.create({
        teacher_name,
        teacher_last_name,
        teacher_identificacion,
        teacher_course_assigned,
        teacher_email,
        Users_fk
      });

      res.status(201).json({
        message: 'Teacher created successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      const result = await TeacherModel.show();

      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'No teachers found' });
      }

      res.status(200).json({
        message: 'Teachers retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in show:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const teacher_id = req.params.id;
      const { teacher_name, teacher_last_name, teacher_identificacion, teacher_course_assigned, teacher_email, Users_fk } = req.body;

      if (!teacher_id || !teacher_name || !teacher_last_name || !teacher_identificacion || !teacher_course_assigned || !teacher_email || !Users_fk) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }

      const result = await TeacherModel.update(teacher_id, {
        teacher_name,
        teacher_last_name,
        teacher_identificacion,
        teacher_course_assigned,
        teacher_email,
        Users_fk
      });

      if (!result || result === 0) {
        return res.status(404).json({ error: 'Teacher not found or not updated' });
      }

      res.status(200).json({
        message: 'Teacher updated successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in update:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const teacher_id = req.params.id;

      if (!teacher_id) {
        return res.status(400).json({ error: 'Teacher ID is required' });
      }

      const result = await TeacherModel.delete(teacher_id);

      if (!result || result === 0) {
        return res.status(404).json({ error: 'Teacher not found or already deleted' });
      }

      res.status(200).json({
        message: 'Teacher deleted successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in delete:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req, res) {
    try {
      const teacher_id = req.params.id;

      if (!teacher_id) {
        return res.status(400).json({ error: 'Teacher ID is required' });
      }

      const result = await TeacherModel.findById(teacher_id);

      if (!result || result.length === 0) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      res.status(200).json({
        message: 'Teacher retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in findById:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default new TeacherController();
