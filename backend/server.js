import express from "express";
import dotenv from "dotenv";
import authRoutes from "C:\Workspace\DollarConnect\backend\routes\auth.route.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use("/api/v1/auth");

app.listen(PORT,()=>{
  console.log(`Server running :${PORT}`);
})
