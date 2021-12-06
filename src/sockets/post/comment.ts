import type Event from '../../types/Event'

import type User from '../../types/User'
import Post from '../../models/Post'
import Comment from '../../models/Comment'
import Notification from '../../models/Notification'

const comment: Event = async (data, io, socket) => {
  const { userId } = socket.data  
  const { content, postId, callback } = data

  try {
    const post = await Post.findById(postId)
    if (!post) throw new Error

    const comment = await Comment.create({
      creator: userId,
      createdAt: new Date().toISOString(),
      content
    })

    await comment.populate('creator')

    post.comments.push(comment._id)
    await post.save()

    if (userId !== (post.creator as User)._id.toString()) {
      const notification = await Notification.create({
        notify: (post.creator as User)._id,
        sender: userId,
        createdAt: new Date().toISOString(),
        postId,
        type: 'comment'
      })
        
      io.to((post.creator as User)._id.toString()).emit('notification/created', { notification })
    }

    callback(comment)
  } catch (error) {
    return console.log('@post/comment', error)
  }
}

export default comment