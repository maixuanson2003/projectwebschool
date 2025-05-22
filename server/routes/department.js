import express from 'express'
import auhtMiddleware from '../middleware/authMiddleware.js'
import { addDepartment,deleteDepartmentById,getDepartment,getDepartmentById, updateDepartmentById } from '../controllers/departmentController.js';
const router=express.Router();
router.post("/add",auhtMiddleware,addDepartment);
router.get("/getlist",getDepartment);
router.get("/:id",getDepartmentById);
router.put("/update/:id",updateDepartmentById);
router.delete("/delete/:id",deleteDepartmentById)
export default router;