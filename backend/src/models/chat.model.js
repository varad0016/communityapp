import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('ChatMessage', chatMessageSchema);
export default Message;
