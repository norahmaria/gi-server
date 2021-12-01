import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import Chat from '../../models/Chat'

const route: Route = {
  method: 'get',
  authorization,
  params: ['page'],
  execute: async (req, res) => {
    const { userId } = res.locals
    const { page } = req.params
    const size = 10
 
    try {
      const length = await Chat.find({ users: userId }).countDocuments()
      const chats = await Chat.find({ users: userId })
        .sort({ createdAt: -1 })
        .skip(size * parseInt(page))
        .limit(size)
        .populate('users')
        .populate({
          path: 'latestMessage', 
          populate: {
            path: 'sender'
          }
        })

      return res.status(200).send({ chats, length })
    } catch (error) {
      console.log('@me/chats', error)
      return res.sendStatus(500)
    }
  }
}

export default route