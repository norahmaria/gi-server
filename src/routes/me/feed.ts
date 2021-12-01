import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import User from '../../models/User'
import Post from '../../models/Post'

const route: Route = {
  method: 'get',
  authorization,
  params: ['page', 'cursor'],
  execute: async (req, res) => {
    const { userId } = res.locals
    const { page, cursor } = req.params
    const size = 10

    try {
      const user = await User.findById(userId)
      if (!user) throw new Error

      let filter = { $or: [
          { creator: { $in: user.following} },
          { creator: user._id }
        ]
      }

      const length = await Post.find(filter).countDocuments()

      const posts = await Post.find(filter)
        .sort({ createdAt: -1 })
        .skip(size * parseInt(page))
        .limit(size)
        .populate('creator')
        .populate('comments')
        .populate({
          path: 'comments',
          populate: [{
            path: 'creator'
          }]
        })

      return res.status(200).send({ posts, length })
    } catch (error) {
      console.log('@me/feed', error)
      return res.sendStatus(500)
    }
  }
}

export default route