import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import type User from '../../types/User'
import Post from '../../models/Post'

const route: Route = {
  method: 'delete',
  params: ['id'],
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals
    const { id } = req.params

    try {
      const post = await Post.findById(id)
        .populate('creator')

      if ((post?.creator as User)._id.toString() === userId) await post?.delete()
      return res.status(200).send({ id })
    } catch (error) {
      console.log('@post/delete', error)
      return res.sendStatus(500)
    }
  }
}

export default route