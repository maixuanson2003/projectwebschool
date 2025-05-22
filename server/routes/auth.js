import express from "express"
import { login,verifyUser } from "../controllers/authController.js";
import authMiddlware from '../middleware/authMiddleware.js'

const route=express.Router();
route.post('/login',login)
route.get('/verify',authMiddlware,verifyUser);
export default route;