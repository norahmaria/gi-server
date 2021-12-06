import type Event from '../types/Event'

import User from '../models/User'

const disconnect: Event = async (data, io, socket) => {  
  console.log('🚦🚦🚦 Socket Disconnected')
  socket.leave(socket.data.userId)

  const users = (await io.fetchSockets()).map(({ data }) => data.userId)
  const user = await User.findById(socket.data.userId)

  const online = users.filter(id => {
    if (user?.following.includes(id) && user?.followers.includes(id)) return true
  })

  for (let i = 0; i < online.length; i++) {
    io.to(online[i]).emit('online/removed', { userId: socket.data.userId })
  }

  socket.disconnect()
}

export default disconnect