import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import User from '../../models/User'
import Post from '../../models/Post'
import Comment from '../../models/Comment'
import Chat from '../../models/Chat'
import Notification from '../../models/Notification'
import Message from '../../models/Message'

const route: Route = {
  method: 'delete',
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals

    try {
      await User.findByIdAndDelete(userId)
      const posts = await Post.find({ creator: userId })
      const comments = await Comment.find({ creator: userId })
      const chats = await Chat.find({ users: userId })
      const notifications = await Notification.find({ $or: [
          { sender: userId },
          { notify: userId }
        ]
      })

      for (let i = 0; i < posts.length; i++) {
        await posts[i].delete()
      }

      for (let i = 0; i < comments.length; i++) {
        await comments[i].delete()
      }

      for (let i = 0; i < notifications.length; i++) {
        await notifications[i].delete()
      }

      for (let i = 0; i < chats.length; i++) {
        const messages = await Message.find({ chatId: chats[i]._id })
        
        for (let i = 0; i < messages.length; i++) {
          await messages[i].delete()
        }
        
        await chats[i].delete()
      }
      
      return res.status(200).send({ status: 'Deleted' })
    } catch (error) {
      console.log('@me/delete', error)
      return res.sendStatus(500)
    }
  }
}

export default route