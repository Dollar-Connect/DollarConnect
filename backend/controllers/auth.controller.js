import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup =async(req,res)=>{
  try {
    const { name, username, email, password}= req.body;

    if(!name || !username || !email || !password){
      return res.status(400).json({message:"All feild are required"});
    }
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

    const token = jwt.sign( { userId:user._id }, process.env.JWT_SECRET, {expiresIn:"3d"} )
    res.cookie("jwt-DollarConnect", token,{
      httpOnly:true,
      maxAge:3*24*60*60*1000,
      sameSite:"strict",
      secure: process.env.NODE_ENV ==="production",
    })
    res.status(201).json({ message:"User registered successfully"})
    //todo:send welcome email 

    const ProfileUrl= process.env.CLIENT_URL+"/Profile/"+user.username

    try {
      await SendWelcomeEmail(user.email,user.name,ProfileUrl)
    } catch (emailerror) {
      console.error("Error Sending Welcome Email",emailerror)
    }  
  } catch (error) {
    console.log("Error in Signup: ", error.message);
    res.status(500).json({ message: "Internal Server Error"})
  }
}

export const login =(req,res)=>{
  res.send("login");
}

export const logout =(req,res)=>{
  res.send("logout");
}