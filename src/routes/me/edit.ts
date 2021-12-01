import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import User from '../../models/User'

const route: Route = {
  method: 'patch',
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals
    const { avatar } = req.body

    try {
      const user = await User.findByIdAndUpdate(userId, {
        $set: { avatar }
      }).select('-password')

      return res.status(200).send(user)
    } catch (error) {
      console.log('@me/edit', error)
      return res.sendStatus(500)
    }
  }
}

export default route