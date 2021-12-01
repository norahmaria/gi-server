// TODO: Figure out how to require types lol, and re-write all import statements to require or find a solution for:
// ERROR: SyntaxError: Cannot use import statement outside a module

// const authorization = require('../../middlewares/http')
import authorization from '../../middlewares/http'

import type Route from '../../types/Route'
import type User from '../../types/User'
import Comment from '../../models/Comment'

const route: Route = {
  method: 'delete',
  params: ['postId', 'id'],
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals
    const { postId, id } = req.params

    try {
      const comment = await Comment.findById(id)
        .populate('creator')

      if ((comment?.creator as User)._id.toString() === userId) await comment?.delete()
      return res.status(200).send({ postId, id })
    } catch (error) {
      console.log('@post/delete', error)
      return res.sendStatus(500)
    }
  }
}

export default route