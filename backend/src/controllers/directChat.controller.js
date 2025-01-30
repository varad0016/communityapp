import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Send Direct Message
export const sendDirectMessage = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { content } = req.body;
    
    // Check if the user is trying to send a message to themselves
    if (userId === req.user._id.toString()) {
        throw new ApiError(400, "You cannot send a message to yourself");
    }

    // Create a new message in the Message model
    const message = await Message.create({
        sender: req.user._id,
        recipient: userId,
        content,
        type: "direct", // This is for identifying direct messages
    });

    res.status(200).json({ message: "Direct message sent successfully", message });
});

// Get All Direct Messages between User and a Specific Recipient
export const getDirectMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    // Get all messages between the logged-in user and the recipient
    const messages = await Message.find({
        $or: [
            { sender: req.user._id, recipient: userId },
            { sender: userId, recipient: req.user._id },
        ],
    })
        .populate("sender", "name email")
        .populate("recipient", "name email")
        .sort({ createdAt: -1 }); // Sort by most recent

    res.status(200).json({ messages });
});
