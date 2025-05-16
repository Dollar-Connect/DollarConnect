import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { deleteNotification, getUserNotification, markNotificationAsRead } from "../controllers/notification.contoller";

const router = express.Router();

router.get("/", protectRoute, getUserNotification);
router.put("/", protectRoute, markNotificationAsRead);
router.delete("/", protectRoute, deleteNotification);

export default router;