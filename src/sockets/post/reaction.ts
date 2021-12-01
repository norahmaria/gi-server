import type Event from '../../types/Event'

import type User from '../../types/User'
import Post from '../../models/Post'
import Notification from '../../models/Notification'

const reaction: Event = async (data, io, socket) => {
  const { userId } = socket.data
  const { reaction, postId, callback } = data
    
  try {
    const post = await Post.findById(postId)
    if (!post) return console.log('no post')

    await post.populate('creator')
    
    let remove = false
    const angryIndex = post.reactions.angry.indexOf(userId)
    const laughIndex = post.reactions.laugh.indexOf(userId)
    const cryIndex = post.reactions.cry.indexOf(userId)
    const heartIndex = post.reactions.heart.indexOf(userId)

    if (angryIndex > -1) {
      if (reaction === 'angry') remove = true
      post.reactions.angry.splice(angryIndex, 1)
    } else if (laughIndex > -1) {
      if (reaction === 'laugh') remove = true
      post.reactions.laugh.splice(laughIndex, 1)
    } else if (cryIndex > -1) {
      if (reaction === 'cry') remove = true
      post.reactions.cry.splice(cryIndex, 1)
    } else if (heartIndex > -1) {
      if (reaction === 'heart') remove = true
      post.reactions.heart.splice(heartIndex, 1)
    }

    // @ts-expect-error
    if (!remove) post.reactions[reaction].push(userId)

    await post.save()
    callback(post)

    if (userId !== (post.creator as User)._id.toString() && !remove) {
      const notification = await Notification.create({
        notify: (post.creator as User)._id,
        sender: userId,
        createdAt: new Date().toISOString(),
        postId,
        type: 'reaction'
      })

      await notification.populate('sender')
      io.to((post.creator as User)._id.toString()).emit('notification/created', { notification })
    }
  } catch (error) {
    return console.log(error)
  }
}

export default reaction