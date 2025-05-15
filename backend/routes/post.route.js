import express from "express";
import { protectRoute} from "../middleware/auth.middleware.js";
import { createPosts, deletePosts, getFeedPosts, getPostById } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/",protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPosts);
router.delete("/delete/:id", protectRoute, deletePosts);
router.get("/:id", protectRoute, getPostById);
router.get("/:id", protectRoute, createPosts);


export default router;
