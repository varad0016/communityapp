import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  phone : { type : String},
  skills: [{ type: String }],
  interests: [{ type: String }],
  role: { type: String, enum: ['student', 'organizer', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
export default User;
