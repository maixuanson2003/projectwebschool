import express from "express";
import auhtMiddleware from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeaveListByEmployeeId,
  getLeaveList,
  getLeaveDetail,
  updateLeave,
} from "../controllers/leaveController.js";
const router = express.Router();
router.post("/add", auhtMiddleware, addLeave);
router.get("/employee/:id", getLeaveListByEmployeeId);
router.get("/list", getLeaveList);
router.get("/:id", getLeaveDetail);
router.put("/update/:id", auhtMiddleware, updateLeave);
export default router;
