import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getFeedPosts = async (req,res) =>{
  try {
    const posts = await Post.find({author:{$in: req.user.connections}})
    .populate("author","user username profilePicture headline")
    .populate("comments.user","name profilePicture")
    .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
   console.error("Error in getFeedPosts", error);
   res.status(500).json({message:"Server error"});
  }
}

export const createPosts =async (req,res) =>{
  try {
    const {content, image} = res.body;

    let newPost;

    if (image) {
      const imgResult = await cloudinary.uploader.upload(image)
      newPost = new Post({
        author:req.user._id,
        content,
        image:imgResult.secure_url
      });
    } else {
      newPost = new Post({
        author:req.user._id,
        content
      });
    }
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    
  }
}