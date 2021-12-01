import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import User from '../../models/User'
import Post from '../../models/Post'

const route: Route = {
  method: 'get',
  authorization,
  params: ['username', 'page'],
  execute: async (req, res) => {
    const { page, username } = req.params
    const size = 10

    try {
      const user = await User.findOne({ username })
      if (!user) throw new Error
      
      const length = await Post.find({ creator: user._id }).countDocuments()
      const posts = await Post.find({ creator: user._id })
        .sort({ createdAt: -1 })
        .skip(size * parseInt(page))
        .limit(size)
        .populate('creator')
        .populate({
          path: 'comments',
          populate: [{
            path: 'creator'
          }]
        })

      return res.status(200).send({ posts, length })
    } catch (error) {
      console.log('@user/posts', error)
      return res.sendStatus(500)
    }
  }
}

export default route