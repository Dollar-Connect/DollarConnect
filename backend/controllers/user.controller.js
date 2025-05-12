import User from "../models/user.model.js"

export const getSuggestedConnections = async(req,res) =>{
  try {
    const currentUser = await User.findById(res.User._id).select("connections");

    const suggestedUser = await User.find({
    _id:{
      $ne: res.user._id,
      $nin: currentUser.connections
    }
    })
    .select("name username profilePicture headline")
    .limit(5);

    res.json(suggestedUser);
  } catch (error) {
    console.error("Error in getSuggestedConnetion Controller:", error);
    res.status(500).json({message:"Server error"});
  }
}

export const getPublicProfile = async(req,res) =>{
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");

    if(!user){
      return res.status(401).json({message:"User not found"});
    }
  } catch (error) {
    console.error("Error in getPublicProfile Contoller", error);
    res.status(500).json({message:"Server Error"});
  }
}