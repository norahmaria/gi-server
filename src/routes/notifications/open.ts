import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import Notification from '../../models/Notification'

const route: Route = {
  method: 'patch',
  authorization,
  execute: async (req, res) => {
    const { id } = req.body
 
    try {
      const notificationOpened = await Notification.findByIdAndUpdate(id, { $set: { read: true } })
      if (!notificationOpened) throw new Error

      return res.status(200).send({ notificationOpened })
    } catch (error) {
      console.log('@notifications/open', error)
      return res.sendStatus(500)
    }
  }
}

export default route