export const getUserNotification = async (req,res) =>{
  try {
    const notification = await Notification.find({ recipient: req.user._id}).sort({ createdAt: -1});
  } catch (error) {
    
  }
}

export const markNotificationAsRead = async (req,res) =>{}

export const deleteNotification = async (req,res) =>{}