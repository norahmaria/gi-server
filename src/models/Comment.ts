import { Schema, model } from 'mongoose'
import type { Comment } from '../types/Comment'

const commentSchema = new Schema<Comment>({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  content: String
})

export default model<Comment>('Comment', commentSchema);