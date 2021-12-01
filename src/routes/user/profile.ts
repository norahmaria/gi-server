import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import User from '../../models/User'

const route: Route = {
  method: 'post',
  authorization,
  execute: async (req, res) => {
    const { username } = req.body
    
    try {
      const user = await User.findOne({ username }).select('-password')
      if (!user) return res.status(404).send({ error: 'No user by that name' })

      return res.status(200).send(user)
    } catch (error) {
      console.log('@user/profile', error)
      return res.sendStatus(500)
    }
  }
}

export default route