import { Document } from 'mongoose'
import type { Message } from './Message'
import type { User } from './User'

export interface Chat extends Document {
  users: User[],
  latestMessage: Message,
  initalizedBy: User
}

export default Chat