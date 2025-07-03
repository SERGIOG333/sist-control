import FatherManagementModel from "../models/fatherManagement.model.js";

class FatherManagementController {

  async register(req, res) {
    try {
      const { father_name, father_last_name, father_email, father_number, student_fk } = req.body;

      if (!father_name || !father_last_name || !father_email || !father_number || !student_fk) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const id = await FatherManagementModel.create({
        father_name,
        father_last_name,
        father_email,
        father_number,
        student_fk
      });

      res.status(201).json({ message: "Father created successfully", data: id });
    } catch (error) {
      console.error("Father register error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async show(req, res) {
    try {
      const result = await FatherManagementModel.show();
      res.status(200).json({ message: "Fathers retrieved successfully", data: result });
    } catch (error) {
      console.error("Show fathers error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const result = await FatherManagementModel.findById(id);

      if (!result) {
        return res.status(404).json({ error: "Father not found" });
      }

      res.status(200).json({ message: "Father found", data: result });
    } catch (error) {
      console.error("Find father error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const { father_name, father_last_name, father_email, father_number, student_fk } = req.body;

      if (!father_name || !father_last_name || !father_email || !father_number || !student_fk) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const result = await FatherManagementModel.update(id, {
        father_name,
        father_last_name,
        father_email,
        father_number,
        student_fk
      });

      if (result === 0) {
        return res.status(404).json({ error: "Father not updated" });
      }

      res.status(200).json({ message: "Father updated successfully", data: result });
    } catch (error) {
      console.error("Update father error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const result = await FatherManagementModel.delete(id);

      if (result === 0) {
        return res.status(404).json({ error: "Father not found" });
      }

      res.status(200).json({ message: "Father deleted successfully", data: result });
    } catch (error) {
      console.error("Delete father error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new FatherManagementController();
