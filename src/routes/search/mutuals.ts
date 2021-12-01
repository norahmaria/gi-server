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
      const users = await User
        .find({
          $and: [
            { username: { $regex : '^' + searchTerm } },
            { following: userId },
            { followers: userId }
          ]
        })
        .limit(7)
        
      return res.status(200).json(users)
    } catch (error) {
      console.log('@search/mutuals', error)
      return res.sendStatus(500)
    }
  }
}

export default route