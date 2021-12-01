import { Document, ObjectId } from 'mongoose'
import type { User } from './User'

export interface Message extends Document {
  chatId: ObjectId,
  sender: User,
  createdAt: Date,
  read: boolean,
  message: string
}

export default Message