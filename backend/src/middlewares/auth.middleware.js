import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Check for the token in cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "No token provided, unauthorized request.");
        }

        // Verify the token using jwt.verify
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            throw new ApiError(401, "Invalid or expired access token.");
        }

        // Find the user from the database using the decoded token data
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "User not found, invalid access token.");
        }

        // Attach the user object to the request for further use
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Catch any other errors and throw a standardized error response
        throw new ApiError(401, error.message || "Unauthorized access.");
    }
});
