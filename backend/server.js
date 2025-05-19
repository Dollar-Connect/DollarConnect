import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import {connectdb} from "./lib/db.js";
import cookieParser from "cookie-parser";
import notificationRoutes from "./routes/notification.route.js";
import connectionRoute from "./routes/connection.route.js"

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/notification",notificationRoutes);
app.use("/api/v1/notification", connectionRoute);

app.listen(PORT,()=>{
  console.log(`Server running :${PORT}`);
  connectdb();
})
