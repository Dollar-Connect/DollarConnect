import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import {connectdb} from "./lib/db.js";

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(PORT,()=>{
  console.log(`Server running :${PORT}`);
  connectdb();
})
