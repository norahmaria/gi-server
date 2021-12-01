import { Document } from 'mongoose'
import type { User } from './User'

export interface Comment extends Document {
  creator: User,
  createdAt: Date,
  content: string
}

export default Comment