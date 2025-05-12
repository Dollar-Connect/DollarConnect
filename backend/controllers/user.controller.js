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