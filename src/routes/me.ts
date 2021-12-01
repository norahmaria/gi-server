import type Route from '../types/Route'
import authorization from '../middlewares/http'

import User from '../models/User'

const route: Route = {
  method: 'get',
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals
    
    try {
      const user = await User.findById(userId).select('-password')
      return res.status(200).send(user)
    } catch (error) {
      console.log('@me', error)
      return res.sendStatus(500)
    }
  }
}

export default route