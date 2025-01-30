import Message from '../models/message.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

// Create a Group Chat Message
export const createGroupMessage = asyncHandler(async (req, res) => {
  const { message, group, event } = req.body;
  const newMessage = await Message.create({
    sender: req.user._id,
    message,
    group,
    event
  });

  res.status(201).json({ message: 'Message sent successfully', newMessage });
});

// Get All Group Messages by Group ID
export const getGroupMessages = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const messages = await Message.find({ group: groupId }).populate('sender', 'name');

  if (!messages) {
    throw new ApiError(404, 'Messages not found');
  }

  res.status(200).json(messages);
});

// Get Group Messages by Event ID
export const getEventGroupMessages = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const messages = await Message.find({ event: eventId }).populate('sender', 'name');

  if (!messages) {
    throw new ApiError(404, 'Messages not found');
  }

  res.status(200).json(messages);
});
