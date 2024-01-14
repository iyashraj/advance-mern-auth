import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorhandlers.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username) {
      throw new Error(`Invalid username`);
    }

    if (!password) {
      throw new Error(`Invalid password`);
    }

    if (!email) {
      throw new Error(`Invalid email`);
    }
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      throw new Error(`User already exists!`);
    }
    const encryptPassword = bcryptjs.hashSync(password, 10);

    const newUser = await new User({
      username,
      email,
      password: encryptPassword,
    });

    await newUser.save();

    res.status(201).json({ message:"User created successfully!" });
  } catch (err) {
    next(errorHandler(500, err.message))
  }
};
export default signup;
