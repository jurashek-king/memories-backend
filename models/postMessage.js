import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
const { Schema } = mongoose;

const postSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  title: String,
  message: String,
  author: String,
  tags: [String],
  selectedFiles: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  }
});

const postMessage = mongoose.model('postMessage', postSchema);

export default postMessage;