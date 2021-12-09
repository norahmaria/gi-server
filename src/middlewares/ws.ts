import { Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import env from '../env/env'

// TODO: Fix Token not being added

const authorization = (socket: Socket, next: (err?: any | undefined) => void) => {
  const { cookie } = socket.request.headers
  console.log('@COOKIE', cookie)
  let token = cookie?.split('token=')[1]

  if (token?.toString().includes('heroku-session-affinity=')) {
    token = token.split('; heroku-session-affinity=')[0]
  }

  if (!token) return socket.disconnect()

  try {
    // @ts-expect-error
    const { userId } = jwt.verify(token, env.SECRET)
    socket.data.userId = userId
    
    return next()
  } catch (error) {
    // JsonWebTokenError: jwt malformed (pc sometimes)
    // JsonWebTokenError: invalid token (mobile)
    console.log('@socket/middlware', error)
    return socket.disconnect()
  }
}

export default authorization