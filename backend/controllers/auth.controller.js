import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup =async(req,res)=>{
  try {
    const { name, username, email, password}= req.body;
    const existingemail = await User.findOne({ email });
    if(existingemail){
      return res.status(400).json({message: "Email already Exists"});
    }
    const existingusername = await User.findOne({ username });
    if(existingemail){
      return res.status(400).json({message: "Username is already taken"});
    }
    if(password.lenght>8){
      res.status(400).json({ message:" Password must be in 8 characters long"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const user = new User({
      name,
      email,
      password:hashedPassword,
      username,
    })
    await user.save();
  } catch (error) {
    
  }
}

export const login =(req,res)=>{
  res.send("login");
}

export const logout =(req,res)=>{
  res.send("logout");
}