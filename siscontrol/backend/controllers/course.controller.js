import CourseModel from "../models/course.model.js";

class CourseController {
  async register(req, res) {
    try {
      const {
        course_course_name,
        course_description,
        course_assigned_teacher,
        course_assigned_student,
        teacher_fk
      } = req.body;

      if (!course_course_name || !course_description || !course_assigned_teacher || 
          !course_assigned_student || !teacher_fk) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const id = await CourseModel.create({
        course_course_name,
        course_description,
        course_assigned_teacher,
        course_assigned_student,
        teacher_fk
      });

      res.status(201).json({ message: "Course created successfully", data: id });
    } catch (error) {
      console.error("Register course error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async show(req, res) {
    try {
      const result = await CourseModel.show();
      res.status(200).json({ message: "Courses retrieved successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving courses" });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const result = await CourseModel.findById(id);

      if (!result) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.status(200).json({ message: "Course found", data: result });
    } catch (error) {
      res.status(500).json({ error: "Error finding course" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const courseData = req.body;

      const updated = await CourseModel.update(id, courseData);
      if (updated === 0) {
        return res.status(404).json({ error: "Course not updated" });
      }

      res.status(200).json({ message: "Course updated successfully", data: updated });
    } catch (error) {
      res.status(500).json({ error: "Error updating course" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deleted = await CourseModel.delete(id);

      if (deleted === 0) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.status(200).json({ message: "Course deleted successfully", data: deleted });
    } catch (error) {
      res.status(500).json({ error: "Error deleting course" });
    }
  }
}

export default new CourseController();
