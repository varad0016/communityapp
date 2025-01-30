import express from "express";
import { createGroup, getAllGroups, joinGroup } from "../controllers/group.controller.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyJWT, createGroup);
router.get("/", verifyJWT, getAllGroups);
router.post("/:groupId/join", verifyJWT, joinGroup);

export default router;
