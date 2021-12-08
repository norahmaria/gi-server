import { Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import env from '../env/env'

// TODO: Fix Token not being added

const authorization = (socket: Socket, next: (err?: any | undefined) => void) => {
  const { cookie } = socket.request.headers
  const token = cookie?.split('token=')[1]

  console.log('@SOCKET HEADERS', socket.request.headers)
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