import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const register = async (req, res) => {
  const {
    email,
    password,
    fullName: { firstName, lastName },
    role = "user",
  } = req.body;
  const isUserAlreadyExixt = await userModel.findOne({ email });

  if (isUserAlreadyExixt) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    password: hash,
    fullName: {
      firstName,
      lastName,
    },
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: "2d" }
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  });
};

export async function googleAuthCallback(req, res) {
  const user = req.user;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email: user.emails[0].value }, { googleId: user.id }],
  });

  if (isUserAlreadyExists) {
    const token = jwt.sign(
      {
        id: isUserAlreadyExists._id,
        role: isUserAlreadyExists.role,
        fullname: isUserAlreadyExists.fullname,
      },
      config.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token);

    if (isUserAlreadyExists.role === "artist") {
      return res.redirect("http://localhost:5173/artist/dashboard"); // Redirect to your frontend URL
    }

    return res.redirect("http://localhost:5173"); // Redirect to your frontend URL
  }

  const newUser = await userModel.create({
    googleId: user.id,
    email: user.emails[0].value,
    fullname: {
      firstName: user.name.givenName,
      lastName: user.name.familyName,
    },
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      role: newUser.role,
      fullname: newUser.fullname,
    },
    config.JWT_SECRET,
    { expiresIn: "2d" }
  );

  res.cookie("token", token);

  res.redirect("http://localhost:5173"); // Redirect to your frontend URL
}
