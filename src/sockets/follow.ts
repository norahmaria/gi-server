import type Event from '../types/Event'

import User from '../models/User'
import Notification from '../models/Notification'

const follow: Event = async (data, io, socket) => {
  const { userId } = socket.data
  const { toFollow, callback } = data

  try {
    const user = await User.findById(userId)
    const userToFollow = await User.findById(toFollow)
    if (!user || !userToFollow) throw new Error

    userToFollow.followers.push(user._id)
    await userToFollow.save()
    
    user?.following.push(userToFollow._id)
    await user.save()

    const notification = await Notification.create({
      notify: toFollow,
      sender: userId,
      createdAt: new Date().toISOString(),
      userId: userId,
      type: 'follow'
    })

    await notification.populate('sender')
    io.to(toFollow).emit('notification/created', { notification })
    
    callback(user)
  } catch (error) {
    return console.log('follow', error)
  }
}

export default follow