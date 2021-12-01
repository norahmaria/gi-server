import type Route from '../../types/Route'
import authorization from '../../middlewares/http'

import User from '../../models/User'

const route: Route = {
  method: 'post',
  authorization,
  execute: async (req, res) => {
    const { userId } = res.locals
    const { id } = req.body

    try {
      const user = await User.findById(userId)
      const userToUnFollow = await User.findById(id)
      if (!user || !userToUnFollow) throw new Error

      const followersIndex = (userToUnFollow.followers as string[]).indexOf(user._id)
      const followingIndex = (user.following as string[]).indexOf(userToUnFollow._id)

      if (followersIndex > -1) {
        userToUnFollow.followers.splice(followersIndex, 1)
        await userToUnFollow.save()
      }

      if (followersIndex > -1) {
        user.following.splice(followingIndex, 1)
        await user.save()
      }

      return res.status(200).send(user)
    } catch (error) {
      console.log('@user/unfollow', error)
      return res.sendStatus(500)
    }
  }
}

export default route