import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";
import Notification from "../models/notification.model.js";

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
    console.error("Error in createPost", error);
    res.status(500).json({message:"Server Error"});
  }
}

export const deletePosts = async (req,res) =>{
 try {
  const postID = req.params.id;
  const userID = req.user._id;

  const post = await Post.findById(postID);
  if(!postID){
    return res.status(404).json({message:"Post Not Found"});
  }

  if(post.author.toString() !== userID.toString()){
    return res.status(403).json({message:"You are not authorized to delete this post"});
  }

  if(post.image){
    //later
    await cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0]);
  }

  await Post.findByIdAndDelete();
  res.status(200).json({message:"Post deleted Succrssfully"});

 } catch (error) {
  console.log("Error in deletePost", error.message);
  res.status(500).json({message:"Server Error"})
 }
}

export const getPostById = async (req,res) =>{
  try {
    const postID = req.params.id;
    
    const post = await Post.findById(postID)
    .populate("author","name username profilePicture headline")
    .populate("comment.user","name username profilePicture headline");

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPostById conntroller", error);
    res.status(500).json({message:"Server Error"});
  }
}

export const createComments = async (req,res) =>{
  try {
    const postID = req.params.id;
    const { content } = req.body;

    const post = await Post.findByIdAndUpdate(postID,
      {
      $push:{comments:{ user: req.user._id, content}},
      },{ new: true }
  ).populate("author","user email username headline profilePicture");

  if(post.author.toString() !== req.user._id.toString()){
    const newNotification = new Notification({
      recipient:post.author,
      type:"comment",
      relatedUser:req.user._id,
      relatedPost:postID
    })

    await newNotification.save();

    try {
      const postUrl = process.env.CLIENT_URL + "/post/" +postID;
      await sendCommentNotificationEmail(post.author.email, post.author.name, req.user.name, postUrl, content)
    } catch (error) {
      console.log("Error in sending comment notification email", error);
    }

    res.status(200).json(post)
  }
  } catch (error) {
    console.error("Error in createComments Controller", error);
    res.status(500).json({message:"Server Error"});
  }
}