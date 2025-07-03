import StudentManagementModel from "../models/studentManagement.model.js";

class StudentManagementController {
  async register(req, res) {
    try {
      const {
        student_name,
        student_last_name,
        student_identificacion,
        student_arrival_time,
        student_departure_time,
        student_email,
        student_date,
        student_photo
      } = req.body;

      if (!student_name || !student_last_name || !student_identificacion || !student_arrival_time ||
          !student_departure_time || !student_email || !student_date || !student_photo) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const id = await StudentManagementModel.create({
        student_name,
        student_last_name,
        student_identificacion,
        student_arrival_time,
        student_departure_time,
        student_email,
        student_date,
        student_photo
      });

      res.status(201).json({ message: "Student created successfully", data: id });
    } catch (error) {
      console.error("Register student error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async show(req, res) {
    try {
      const result = await StudentManagementModel.show();
      res.status(200).json({ message: "Students retrieved successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving students" });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const result = await StudentManagementModel.findById(id);

      if (!result) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json({ message: "Student found", data: result });
    } catch (error) {
      res.status(500).json({ error: "Error finding student" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const studentData = req.body;

      const updated = await StudentManagementModel.update(id, studentData);
      if (updated === 0) {
        return res.status(404).json({ error: "Student not updated" });
      }

      res.status(200).json({ message: "Student updated successfully", data: updated });
    } catch (error) {
      res.status(500).json({ error: "Error updating student" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleted = await StudentManagementModel.delete(id);

      if (deleted === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json({ message: "Student deleted successfully", data: deleted });
    } catch (error) {
      res.status(500).json({ error: "Error deleting student" });
    }
  }
}

export default new StudentManagementController();
