import express from "express";
import auhtMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployeesById,
  updateEmployee,
  getEmployeeByDepId,
} from "../controllers/employeeController.js";
const router = express.Router();
router.post("/add", auhtMiddleware, upload.single("image"), addEmployee);
router.get("/getlist", getEmployees);
router.get("/:id", getEmployeesById);
router.get("/department/:id", getEmployeeByDepId);
router.put("/update/:id", auhtMiddleware, updateEmployee);
// router.delete("/delete/:id",deleteDepartmentById)
export default router;
