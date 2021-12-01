import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import User from '../../models/User'

const route: Route = {
  method: 'post',
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals
    const { searchTerm } = req.body
    
    try {
      const user = await User.findById(userId)
      if (!user) throw new Error

      const users = await User.find({
        username: { $regex : '^' + searchTerm }
      })
        .limit(6)
        .populate('followers')

      return res.status(200).json(users)
    } catch (error) {
      console.log('@search/general', error)
      return res.sendStatus(500)
    }
  }
}

export default route