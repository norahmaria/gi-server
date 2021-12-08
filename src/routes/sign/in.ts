import type Route from '../../types/Route'
import jwt from 'jsonwebtoken'
import env from '../../env/env'
import bcrypt from 'bcryptjs'

import User from '../../models/User'
import validateSignIn from '../../utils/validation/signIn'

const route: Route = {
  method: 'post',
  execute: async (req, res) => {
    const { username, password } = req.body.user

    try {
      const { errors, valid } = validateSignIn(username, password)
      if (!valid) return res.status(401).send({ errors })
      
      const user = await User.findOne({ username: username.toLowerCase() })
      if (!user) return res.status(404).send({ errors: { username: 'User not found' }})

      const correctPassword = await bcrypt.compare(password, user.password)
      if (!correctPassword) return res.status(401).send({ errors: { password: 'Wrong password' } })

      const token = jwt.sign({ userId: user._id }, env.SECRET, { expiresIn: "1hr" })
      return res.status(200).cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: env.ENVIRONMENT === 'LIVE',
        sameSite: env.ENVIRONMENT === 'LIVE' ? 'none' : 'lax',
        httpOnly: true
      }).send(user)
    } catch (error) {
      console.log('@sign/in', error)
      return res.sendStatus(500)
    }
  }
}

export default route