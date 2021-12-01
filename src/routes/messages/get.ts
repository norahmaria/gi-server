import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import Message from '../../models/Message'

const route: Route = {
  method: 'post',
  authorization,
  params: ['chatId', 'page'],
  execute: async (req, res) => {
    const { chatId, page } = req.params
    const size = 20
    
    try {
      // @ts-expect-error
      const length = await Message.find({ chatId }).countDocuments()

      // @ts-expect-error
      const messages = await Message.find({ chatId })
        .sort({ createdAt: 1 })
        .skip(size * parseInt(page))
        .populate('sender')

      return res.status(200).send({ messages, length })
    } catch (error) {
      console.log('@messages/get', error)
      return res.sendStatus(500)
    }
  }
}

export default route