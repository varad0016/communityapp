import express from "express";
import {
    addMemberToGroup,
    getAllMembersOfGroup,
    getMemberByUserIdInGroup,
    updateMemberRoleInGroup,
    removeMemberFromGroup
} from "../controllers/groupMember.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add a Member to a Group
router.post("/add", verifyJWT, addMemberToGroup);

// Get All Members of a Group
router.get("/:groupId", verifyJWT, getAllMembersOfGroup);

// Get a Member by User ID in a Group
router.get("/:groupId/:userId", verifyJWT, getMemberByUserIdInGroup);

// Update Member Role in Group
router.put("/:memberId", verifyJWT, updateMemberRoleInGroup);

// Remove a Member from a Group
router.delete("/:memberId", verifyJWT, removeMemberFromGroup);

export default router;
