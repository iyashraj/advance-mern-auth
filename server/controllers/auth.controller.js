import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res) => {
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
    res.status(500).json({ message: err.message });
  }
};
export default signup;
