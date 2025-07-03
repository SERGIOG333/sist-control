import CourseStudentModel from "../models/courseStudent.model.js";

class CourseStudentController {
  async register(req, res) {
    try {
      const { course_fk, student_fk } = req.body;

      if (!course_fk || !student_fk) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const id = await CourseStudentModel.create({ course_fk, student_fk });
      res.status(201).json({ message: "Relation created successfully", data: id });
    } catch (error) {
      console.error("Error creating relation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const result = await CourseStudentModel.show();
      res.status(200).json({ message: "Relations retrieved successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving relations" });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const result = await CourseStudentModel.findById(id);

      if (!result) {
        return res.status(404).json({ error: "Relation not found" });
      }

      res.status(200).json({ message: "Relation found", data: result });
    } catch (error) {
      res.status(500).json({ error: "Error finding relation" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const { course_fk, student_fk } = req.body;

      if (!course_fk || !student_fk) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const updated = await CourseStudentModel.update(id, { course_fk, student_fk });

      if (updated === 0) {
        return res.status(404).json({ error: "Relation not updated" });
      }

      res.status(200).json({ message: "Relation updated successfully", data: updated });
    } catch (error) {
      res.status(500).json({ error: "Error updating relation" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleted = await CourseStudentModel.delete(id);

      if (deleted === 0) {
        return res.status(404).json({ error: "Relation not found" });
      }

      res.status(200).json({ message: "Relation deleted successfully", data: deleted });
    } catch (error) {
      res.status(500).json({ error: "Error deleting relation" });
    }
  }
}

export default new CourseStudentController();
