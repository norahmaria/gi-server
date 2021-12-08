import { Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import env from '../env/env'

// TODO: Fix Token not being added

const authorization = (socket: Socket, next: (err?: any | undefined) => void) => {
  const { cookie } = socket.request.headers
  const token = cookie?.split('token=')[1]

  if (!token) return socket.disconnect()

  try {
    // @ts-expect-error
    const { userId } = jwt.verify(token, env.SECRET)
    console.log('@SOCKET USERID', userId)
    socket.data.userId = userId

    return next()
  } catch (error) {
    console.log('@SOCKET AUTH ERROR', error)
    return socket.disconnect()
  }
}

export default authorization