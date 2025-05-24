import express from "express";
import auhtMiddleware from "../middleware/authMiddleware.js";
import {
  AddSalary,
  getSalaryByEmployeeId,
} from "../controllers/salaryController.js";
const router = express.Router();
router.post("/add", auhtMiddleware, AddSalary);
router.get("/employee/:id", getSalaryByEmployeeId);
export default router;
