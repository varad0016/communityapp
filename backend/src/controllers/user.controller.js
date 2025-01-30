import { asyncHandler } from "../utils/asyncHandler.js";

export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User profile retrieved successfully", data: req.user });
});
