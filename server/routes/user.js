import express from "express";

import authMiddlware from "../middleware/authMiddleware.js";
import {
  getUserById,
  getUserList,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const router = express.Router();
router.get("/list", getUserList);
router.get("/:id", getUserById);
router.put("/update/:id", authMiddlware, updateUser);
router.delete("/delete/:id", authMiddlware, deleteUser);
export default router;
