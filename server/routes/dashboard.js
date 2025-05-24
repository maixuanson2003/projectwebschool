import express from "express";
import auhtMiddleware from "../middleware/authMiddleware.js";
import { getSummary } from "../controllers/dashboardController.js";
const router = express.Router();
router.get("/summary", auhtMiddleware, getSummary);
export default router;
