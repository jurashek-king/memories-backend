import mongoose from 'mongoose';
const { Schema } = mongoose;
import { nanoid } from 'nanoid';

const userSchema = new Schema({
  _id: { type: String, default: () => nanoid() },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const newUser = mongoose.model('newUser', userSchema);
export default newUser;