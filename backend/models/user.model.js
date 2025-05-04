import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepicture: {
    type: String,
    default: "",
  },
  bannerimg: {
    type: String,
    default: "",
  },
  headline: {
    type: String, // ❗️fixed typo: "tpye" -> "type"
    default: "DollarConnect user",
  },
  location: { // ❗️fixed typo: "loacation" -> "location"
    type: String,
    default: "Earth",
  },
  about: {
    type: String,
    default: "",
  },
  Skills: [String],
  experience: [
    {
      title: String,
      company: String,
      startdate: Date,
      enddate: Date,
      description: String,
    },
  ],
  education: [ // ❗️fixed typo: "eduation" -> "education"
    {
      school: String,
      fieldofstudy: String,
      startyear: Number, // ❗️style: lowercase for consistency
      endyear: Number,
    },
  ],
  connection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, { timestamps: true });

const User = mongoose.model("User", userschema);

export default User;
