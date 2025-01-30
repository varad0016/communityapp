import { Group } from "../models/group.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Create a Group
export const createGroup = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const group = await Group.create({ name, category, admin: req.user._id, members: [req.user._id] });

    res.status(201).json({ message: "Group created successfully", group });
});

// Get All Groups
export const getAllGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find().populate("admin", "name");
    res.status(200).json(groups);
});

// Join a Group
export const joinGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    if (group.members.includes(req.user._id)) {
        throw new ApiError(400, "Already a member");
    }

    group.members.push(req.user._id);
    await group.save();

    res.status(200).json({ message: "Joined group successfully", group });
});
