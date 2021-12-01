import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import Notification from '../../models/Notification'

const route: Route = {
  method: 'get',
  authorization,
  params: ['page'],
  execute: async (req, res) => {
    const { userId } = res.locals
    const { page } = req.params
    const size = 10
 
    try {
      const length = await Notification.find({ notify: userId }).countDocuments()
      const notifications = await Notification.find({ notify: userId })
        .sort({ createdAt: -1 })
        .skip(size * parseInt(page))
        .limit(size)
        .populate('sender')

      return res.status(200).send({ notifications, length })
    } catch (error) {
      console.log('@me/notifications', error)
      return res.sendStatus(500)
    }
  }
}

export default route