import { Schema, model } from 'mongoose'
import type { Chat } from '../types/Chat'

const chatSchema = new Schema<Chat>({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  latestMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message'
  },
  initalizedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default model<Chat>('Chat', chatSchema)