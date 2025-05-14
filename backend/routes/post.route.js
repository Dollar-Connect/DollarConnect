import express from "express";
import { protectRoute} from "../middleware/auth.middleware.js";
import { createPosts, deletePosts, getFeedPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/",protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPosts);
router.delete("/delete", protectRoute, deletePosts);


export default router;
