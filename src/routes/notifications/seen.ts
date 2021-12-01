import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import Notification from '../../models/Notification'

const route: Route = {
  method: 'patch',
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals
 
    try {
      // const notificationsToSee = await Notification.find({ $and: [
      //   { notify: userId },
      //   { seen: false }
      // ]})

      const notificationsToSee = (await Notification.find({ notify: userId })).filter(({ seen }) => seen === false)

      for (let i = 0; i < notificationsToSee.length; i++) {
        notificationsToSee[i].seen = true
        await notificationsToSee[i].save()
      }

      return res.status(200).send({ notificationsToSee })
    } catch (error) {
      console.log('@notifications/seen', error)
      return res.sendStatus(500)
    }
  }
}

export default route