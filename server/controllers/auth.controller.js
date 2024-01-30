import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorhandlers.js";
import jwt from "jsonwebtoken";

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

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isValidUser = await User.findOne({ email });

    if (!isValidUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, isValidUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
    const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = isValidUser._doc;
    const expireDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expireDate }) // 1 Hour
      .status(200)
      .json(rest);
  } catch (err) {
    next(errorHandler(500, err.message));
  }
};

const google = async (req, res, next) => {
  console.log(req)
  try {
    const user = User.findOne({ email: req.body.email });
    if (user) {
      console.log("new")
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expireDate = new Date(Date.now() + 3600000); // 1 Hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
        })
        .status(200)
        .json(rest);
    } else {
      console.log("old")
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expireDate = new Date(Date.now() + 3600000); // 1 Hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expireDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (err) {}
};

export { signup, signin, google };
