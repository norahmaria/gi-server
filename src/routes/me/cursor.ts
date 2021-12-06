import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import User from '../../models/User'
import Post from '../../models/Post'

const route: Route = {
  method: 'get',
  authorization,
  params: ['limit', 'cursor'],
  execute: async (req, res) => {
    const { userId } = res.locals
    let { limit, cursor } = req.params

    try {
      const user = await User.findById(userId)
      if (!user) throw new Error
      
      const filter = cursor === 'NaN' ? { $or: [
          { creator: { $in: user.following} },
          { creator: user._id }
        ]
      } : { $or: [
        { creator: { $in: user.following} },
        { creator: user._id }
      ], _id: { $gte: cursor }
    }
      
      // const length = await Post.find(filter).countDocuments()
      const posts = await Post.find(filter)
        .sort({ createdAt: -1 })
        .limit(Number(limit) + 1)
        .populate('creator')
        .populate('comments')
        .populate({
          path: 'comments',
          populate: [{
            path: 'creator'
          }]
        })

      posts.length = Number(limit)

      return res.status(200).send({ 
        posts, 
        limit,
        length: posts.length, 
        cursor: posts[Number(limit)]._id })
    } catch (error) {
      console.log('@me/cursor', error)
      return res.sendStatus(500)
    }
  }
}

export default route