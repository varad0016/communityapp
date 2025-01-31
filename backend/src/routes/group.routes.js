import express from "express";
import {
    createGroup,
    getAllGroups,
    getGroupById,
    updateGroup,
    addMember,
    removeMember,
    deleteGroup,
    getUserGroups
} from "../controllers/group.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create a Group
router.post("/", verifyJWT, createGroup);

// Get All Groups
router.get("/", verifyJWT, getAllGroups);

// Get Group by ID
router.get("/:groupId", verifyJWT, getGroupById);

// Update Group
router.put("/:groupId", verifyJWT, updateGroup);

// Add Member to Group
router.post("/:groupId/add-member", verifyJWT, addMember);

// Remove Member from Group
router.delete("/:groupId/remove-member", verifyJWT, removeMember);

// Delete Group
router.delete("/:groupId", verifyJWT, deleteGroup);

router.get('/user/groups', getUserGroups);

export default router;
