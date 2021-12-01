import { Schema, model } from 'mongoose'
import type { Notification } from '../types/Notification'

const notificationSchema = new Schema<Notification>({
  notify: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  seen: {
    type: Boolean,
    default: false
  },
  postId: String,
  type: String
})

export default model<Notification>('Notification', notificationSchema);