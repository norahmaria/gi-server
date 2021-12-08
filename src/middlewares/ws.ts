import { Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import env from '../env/env'

const authorization = (socket: Socket, next: (err?: any | undefined) => void) => {
  const { cookie } = socket.request.headers
  const token = cookie?.split('token=')[1]

  console.log('@COOKIE VARIABLE', cookie)
  if (!token) return socket.disconnect()

  try {
    // @ts-expect-error
    const { userId } = jwt.verify(token, env.SECRET)
    socket.data.userId = userId

    return next()
  } catch (error) {
    return socket.disconnect()
  }
}

export default authorization