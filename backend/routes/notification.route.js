import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteNotification, getUserNotification, markNotificationAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserNotification);
router.put("/", protectRoute, markNotificationAsRead);
router.delete("/", protectRoute, deleteNotification);

export default router;