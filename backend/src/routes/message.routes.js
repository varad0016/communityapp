import express from 'express';
import { createGroupMessage, getGroupMessages } from '../controllers/chat.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Route for creating a group chat message
router.post('/group', verifyJWT, createGroupMessage);

// Route for getting all messages in a group
router.get('/group/:groupId', verifyJWT, getGroupMessages);


export default router;
