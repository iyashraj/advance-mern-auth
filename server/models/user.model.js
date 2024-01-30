import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fxsgames.co%2Frandomusers%2F&psig=AOvVaw2PFgEI5aOLnSQydZFv3mL-&ust=1706718712048000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJCRv-zEhYQDFQAAAAAdAAAAABAE"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema)

export default User;