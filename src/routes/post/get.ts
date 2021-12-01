import type Route from '../../types/Route'

import Post from '../../models/Post'

const route: Route = {
  method: 'get',
  params: ['id'],
  execute: async (req, res) => {
    const { id } = req.params
    
    try {
      const post = await Post.findById(id)
        .populate('creator')
        .populate({
          path: 'comments',
          populate: [{
            path: 'creator'
          }]
        })
        
      return res.status(200).send(post)
    } catch (error) {
      console.log('@post/get', error)
      return res.sendStatus(500)
    }
  }
}

export default route