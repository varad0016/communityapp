import Message from "../models/chat.model.js";

export const createGroupMessage = async (req, res) => {
  const { groupId, message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    // Assuming the groupId is passed in the body and is validated
    const newMessage = await Message.create({
      sender: req.user._id,
      group: groupId,
      message,
    });

    // Emit the message to the group using socket.io (if applicable)
    req.app.get('io').to(groupId).emit('receiveGroupMessage', {
      sender: req.user._id,
      groupId,
      message: newMessage.message,
      sentAt: newMessage.createdAt,
    });

    return res.status(201).json({ message: 'Message sent successfully', newMessage });
  } catch (error) {
    return res.status(500).json({ message: 'Error sending message', error });
  }
};

// Get All Messages in a Group
export const getGroupMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Retrieve all messages from the specific group
    const messages = await Message.find({ group: groupId })
      .populate('sender', 'name email')  // Populate sender details
      .sort({ createdAt: 1 });  // Sort messages by creation time

    if (!messages.length) {
      return res.status(404).json({ message: 'No messages found for this group' });
    }

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving group messages', error });
  }
};
