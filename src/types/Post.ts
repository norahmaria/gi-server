import { Document, ObjectId } from 'mongoose'
import type { Comment } from './Comment'
import type { User } from './User'

export interface Post extends Document {
  creator: User | string,
  createdAt: Date,
  reactions: {
    angry: string[],
    laugh: string[],
    cry: string[],
    heart: string[]
  },
  comments: [Comment],
  content: string,
  media: string
}

export default Post
