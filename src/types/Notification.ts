import { Document, ObjectId } from 'mongoose'
import type { User } from './User'

export interface Notification extends Document {
  notify: User | ObjectId,
  sender: User,
  createdAt: Date,
  read: boolean,
  seen: boolean,
  postId: string,
  type: 'Reaction' | 'Comment' | 'Follow'
}

export default Notification