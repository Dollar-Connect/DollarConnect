import express from "express";
import { protectRoute} from "../middleware/auth.middleware.js";
import { createPosts, deletePosts, getFeedPosts, getPostById, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/",protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPosts);
router.delete("/delete/:id", protectRoute, deletePosts);
router.get("/:id", protectRoute, getPostById);
router.get("/:id/comment", protectRoute, createPosts);
router.post("/:id/comment", protectRoute, likePost);

export default router;
