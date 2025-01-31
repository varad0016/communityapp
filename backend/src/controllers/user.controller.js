import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User profile retrieved successfully", data: req.user });
});

// Update User Profile
export const updateProfile = async (req, res) => {
    try {
        const  userId  = req.user._id; // Extract userId from request parameters
        const { name, bio, skills  , phone} = req.body; // Extract fields from request body

        console.log(userId , name , bio , skills);

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (skills) user.skills = skills;
        if(phone) user.phone = phone;


        // Save updated user profile
        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};
