import mongoose from 'mongoose';

const userPreferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  allowMessages: { type: Boolean, default: true },
  receiveEventNotifications: { type: Boolean, default: true },
  preferredEventCategories: [{ type: String }],
  preferredGroupCategories: [{ type: String }],
});

const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);
export default UserPreference;
