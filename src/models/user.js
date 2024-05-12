// models/User.js
import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  bio: String,
  phone: String,
  profileVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  profilePicture: Buffer
});

const User = model('User', userSchema);

export default User;
