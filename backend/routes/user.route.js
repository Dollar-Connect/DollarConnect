import express, { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getPublicProfile, getSuggestedConnections } from "../controllers/user.controller";

const router = express.Router();
router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);

export default Router;