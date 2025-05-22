import express from "express"
import cors from "cors"
import mongoose from 'mongoose';
import connectToDatabase from "./db/db.js";
import userRegister from "./userSeed.js";
import authRouter from'./routes/auth.js'
import authMiddlware from './middleware/authMiddleware.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
connectToDatabase();
const app=express();
userRegister();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))
app.use('/api/auth',authRouter);
app.use('/api/department',departmentRouter);
app.use('/api/employee',employeeRouter);
app.use('/api/salary',salaryRouter);
app.use('/api/leave',leaveRouter);
app.listen(process.env.PORT,()=>{
    console.log("server start");
    
})