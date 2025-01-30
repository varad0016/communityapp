import { Group } from "../models/group.model.js";
import { Message } from "../models/message.model.js"; // Assuming a Message model for storing messages
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Send Message to a Group
export const sendGroupMessage = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { content } = req.body;
    
    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    // Check if user is a member of the group
    if (!group.members.includes(req.user._id)) {
        throw new ApiError(403, "You are not a member of this group");
    }

    // Create a new message in the Message model
    const message = await Message.create({
        sender: req.user._id,
        group: groupId,
        content,
        type: "group", // This is for identifying group messages
    });

    res.status(200).json({ message: "Message sent successfully", message });
});

// Get All Messages of a Group
export const getGroupMessages = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    
    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    // Get all messages for the group
    const messages = await Message.find({ group: groupId })
        .populate("sender", "name email")
        .sort({ createdAt: -1 }); // Sort messages by most recent

    res.status(200).json({ messages });
});
