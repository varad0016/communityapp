import Group from "../models/group.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Create a Group
export const createGroup = asyncHandler(async (req, res) => {
    const { name, description, category } = req.body;

    // Validate required fields
    if (!name || !category) {
        throw new ApiError(400, "Group name and category are required");
    }

    const group = await Group.create({
        name,
        description,
        category,
        createdBy: req.user._id, // Assuming "admin" was meant to be "createdBy"
        members: [req.user._id], // Adding the creator to the members list
    });

    res.status(201).json({
        status: "success",
        message: "Group created successfully",
        group,
    });
});

// Get All Groups
export const getAllGroups = asyncHandler(async (req, res) => {
    const groups = await Group.find()
        .populate("createdBy", "name") // Populating creator name
        .populate("members", "name"); // Optionally populate members' names if needed

    res.status(200).json({
        status: "success",
        groups,
    });
});

// Get a Group by ID
export const getGroupById = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.groupId)
        .populate("createdBy", "name")
        .populate("members", "name");

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    res.status(200).json({
        status: "success",
        group,
    });
});

// Update a Group
export const updateGroup = asyncHandler(async (req, res) => {
    const { name, description, category } = req.body;
    const group = await Group.findById(req.params.groupId);

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    if (group.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this group");
    }

    group.name = name || group.name;
    group.description = description || group.description;
    group.category = category || group.category;

    await group.save();

    res.status(200).json({
        status: "success",
        message: "Group updated successfully",
        group,
    });
});

// Add Member to Group
export const addMember = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    if (group.members.includes(req.user._id)) {
        throw new ApiError(400, "Already a member");
    }

    group.members.push(req.user._id);
    await group.save();

    res.status(200).json({
        status: "success",
        message: "User added to the group successfully",
        group,
    });
});

// Remove Member from Group
export const removeMember = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    if (group.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Only the creator can remove members");
    }

    group.members.pull(req.body.userId);
    await group.save();

    res.status(200).json({
        status: "success",
        message: "User removed from the group successfully",
        group,
    });
});

// Delete a Group
export const deleteGroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
        throw new ApiError(404, "Group not found");
    }

    if (group.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Only the creator can delete the group");
    }

    await group.remove();

    res.status(200).json({
        status: "success",
        message: "Group deleted successfully",
    });
});


// Controller to get groups created by the logged-in user
export const getUserGroups = async (req, res) => {
    try {
        // Assuming user ID is stored in req.user._id after authentication middleware
        const userId = req.user._id;

        const groups = await Group.find({ createdBy: userId });
        if (!groups.length) {
            return res.status(404).json({ message: 'No groups found for this user.' });
        }

        return res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};
