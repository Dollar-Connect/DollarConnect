import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/auth.route.js";
import {connectdb} from "./lib/db.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use(cookieParser());

app.listen(PORT,()=>{
  console.log(`Server running :${PORT}`);
  connectdb();
})
