import { Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import env from '../env/env'

const authorization = (socket: Socket, next: (err?: any | undefined) => void) => {
  const { cookie } = socket.request.headers
  if (!cookie) return socket.disconnect()
  
  const cookies = cookie.split(';').map(variable => variable.trim())
  if (!cookies) return socket.disconnect()

  try {
    const token = () => {
      const index = cookies?.findIndex(variable => variable.startsWith('token'))
      return cookies[index].split('token=')[1]
    }

    // @ts-expect-error
    const { userId } = jwt.verify(token(), env.SECRET)
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