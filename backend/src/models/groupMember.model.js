import mongoose from 'mongoose';

const groupMemberSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['admin', 'moderator', 'member'], default: 'member' },
  joinedAt: { type: Date, default: Date.now },
});

const GroupMember = mongoose.model('GroupMember', groupMemberSchema);
export default GroupMember;
