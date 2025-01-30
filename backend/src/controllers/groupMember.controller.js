import GroupMember from '../models/groupMember.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// Add a Member to Group
export const addMemberToGroup = asyncHandler(async (req, res) => {
    const { groupId, userId, role } = req.body;
    const groupMember = await GroupMember.create({
        group: groupId,
        user: userId,
        role: role || 'member',
    });
    res.status(201).json({ message: "Member added to the group successfully", groupMember });
});

// Get All Members of a Group
export const getAllMembersOfGroup = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const members = await GroupMember.find({ group: groupId }).populate("user", "name email").populate("group", "name");
    if (!members || members.length === 0) {
        throw new ApiError(404, "No members found in this group");
    }
    res.status(200).json(members);
});

// Get a Member by User ID in Group
export const getMemberByUserIdInGroup = asyncHandler(async (req, res) => {
    const { groupId, userId } = req.params;
    const member = await GroupMember.findOne({ group: groupId, user: userId }).populate("user", "name email").populate("group", "name");
    if (!member) {
        throw new ApiError(404, "Member not found in this group");
    }
    res.status(200).json(member);
});

// Update Member Role in Group
export const updateMemberRoleInGroup = asyncHandler(async (req, res) => {
    const { memberId } = req.params;
    const { role } = req.body;

    if (!['admin', 'moderator', 'member'].includes(role)) {
        throw new ApiError(400, "Invalid role specified");
    }

    const groupMember = await GroupMember.findByIdAndUpdate(
        memberId,
        { role },
        { new: true }
    ).populate("user", "name email").populate("group", "name");

    if (!groupMember) {
        throw new ApiError(404, "Member not found");
    }

    res.status(200).json({ message: "Member role updated successfully", groupMember });
});

// Remove a Member from Group
export const removeMemberFromGroup = asyncHandler(async (req, res) => {
    const { memberId } = req.params;
    const groupMember = await GroupMember.findByIdAndDelete(memberId);
    if (!groupMember) {
        throw new ApiError(404, "Member not found in the group");
    }
    res.status(200).json({ message: "Member removed from the group successfully", groupMember });
});
