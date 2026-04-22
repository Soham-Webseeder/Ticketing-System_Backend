import Admin from "../models/AdminSchema.js";
import Client from "../models/ClientModel.js";
import Developer from "../models/DeveloperModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login=async(req,res)=>{
    try{
const {email,password}=req.body;

let user=null;

user=await Admin.findOne({email});

if(!user){
    user=await Client.findOne({email});
}

if(!user){
    user=await Developer.findOne({email});
}

if(!user){
    return res.status(404).json({message:"User not found"});
}

const isMatch=await bcrypt.compare(password,user.password);

if(!isMatch){
    return res.status(400).json({message:"Invalid credentials"});
}

const token=jwt.sign(
    {id:user._id,role:user.role},
process.env.JWT_SECRET,
{expiresIn:"1d"}
)

 return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role
    });

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"something went wrong"});
    }
}