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
      default:"https://chatsense.in.net/fb9afa84739c3239a0f5a57153fa5e9e2367f1adb4d2ef9a2c47f2cba31a74b0/8985aa82-ad55-4c9d-b135-e1a8f6169b73.png"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema)

export default User;