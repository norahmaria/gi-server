import { Schema, model } from 'mongoose'
import type { Message } from '../types/Message'

const messageSchema = new Schema<Message>({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  read: {
    type: Boolean,
    default: false
  },
  message: String
})

export default model<Message>('Message', messageSchema);