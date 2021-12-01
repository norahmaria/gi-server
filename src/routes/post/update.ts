import type Route from '../../types/Route'

import Post from '../../models/Post'

const route: Route = {
  method: 'patch',
  params: ['id'],
  execute: async (req, res) => {
    const { id } = req.params
    const { content } = req.body

    try {
      const postDocument = await Post.findByIdAndUpdate(id, {
        $set: { content }
      }, { new: true }).populate('creator')
      return res.status(200).send(postDocument)
    } catch (error) {
      console.log('@post/edit', error)
      return res.sendStatus(500)
    }
  }
}

export default route