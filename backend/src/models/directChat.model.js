import mongoose from 'mongoose';

const directMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

const DirectMessage = mongoose.model('DirectMessage', directMessageSchema);
export default DirectMessage;
