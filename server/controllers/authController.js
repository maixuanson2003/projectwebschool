import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            res.status(404).json({success:false,error:"User Not Found"});
        }
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(404).json({success:false,error:"Not match Found"});
        }
        const token=jwt.sign({
            _id:user._id,
            role:user.role,
        },process.env.JWT_KEY,{expiresIn:"10d"})
        res.status(200).json({success:true,token,user:{
            _id:user._id,
            role:user.role,
            name:user.name
        }});

    }catch(error){
        res.status(500).json({success:false,error:error.message});
        console.log(error.message);
        
    }

}
const verifyUser=async (req,res)=>{
    console.log(req.user);
    
    return res.status(200).json({success:true,user:req.user})
}
export {login,verifyUser}