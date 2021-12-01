import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import Post from '../../models/Post'

const route: Route = {
  method: 'post',
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals
    const { content, media} = req.body.post
    
    if (content.trim() === '') return res.sendStatus(405)

    try {
      const post = await Post.create({
        creator: userId,
        createdAt: new Date().toISOString(),
        reactions: {
          angry: [],
          laugh: [],
          cry: [],
          heart: []
        },
        comments: [],
        content,
        media
      })
      
      await post.populate('creator')

      return res.status(200).send(post)
    } catch (error) {
      console.log('@post/create', error)
      return res.sendStatus(500)
    }
  }
}

export default route