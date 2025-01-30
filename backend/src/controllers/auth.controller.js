import  User  from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(email,password);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    res.cookie("accessToken", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful", token });
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("accessToken", "", { expires: new Date(0) });
    res.status(200).json({ message: "Logout successful" });
});
