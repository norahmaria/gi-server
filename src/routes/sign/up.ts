import type Route from '../../types/Route'
import jwt from 'jsonwebtoken'
import env from '../../env/env'
import bcrypt from 'bcryptjs'

import User from '../../models/User'
import validateSignUp from '../../utils/validation/signUp'

const route: Route = {
  method: 'post',
  execute: async (req, res) => {
    const { username, email, password, confirmPassword, avatar } = req.body.user
  
    try {
      const { errors, valid } = validateSignUp(username, email, password, confirmPassword)
      if (!valid) return res.status(401).send({ errors })

      const existingUser = await User.findOne({ username })
      if (existingUser) return res.status(401).send({ errors: { username: 'Username taken' } })

      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 12),
        following: [],
        followers: [],
        avatar
      })

      const token = jwt.sign({ userId: user._id }, env.SECRET, { expiresIn: "1hr" })

      return res.status(200).cookie('token', token, {
        expires: new Date(Date.now() + 604800000),
        secure: env.ENVIRONMENT === 'LIVE',
        sameSite: env.ENVIRONMENT === 'LIVE' ? 'lax' : 'lax',
        httpOnly: true
      }).send(user)
    } catch (error) {
      console.log('@sign/up', error)
      return res.sendStatus(500)
    }
  }
}

export default route