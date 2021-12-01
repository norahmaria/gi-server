import { Schema, model, ObjectId } from 'mongoose'
import type { Post } from '../types/Post'

const postSchema = new Schema<Post>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  reactions: {
    angry: {
      type: [String],
      default: []
    },
    laugh: {
      type: [String],
      default: []
    },
    cry: {
      type: [String],
      default: []
    },
    heart: {
      type: [String],
      default: []
    }
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  content: String,
  media: String
})

export default model<Post>('Post', postSchema);