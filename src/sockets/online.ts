import type Event from '../types/Event'

import User from '../models/User'

const online: Event = async (data, io, socket) => {
  const { callback } = data
  
  socket.join(socket.data.userId)

  try {
    const users = (await io.fetchSockets()).map(({ data }) => data.userId)
    const user = await User.findById(socket.data.userId)
  
    const online = users.filter(id => {
      if (user?.following.includes(id) && user?.followers.includes(id)) return true
    })
  
    for (let i = 0; i < online.length; i++) {
      io.to(online[i]).emit('online/created', { userId: socket.data.userId })
    }
  
    callback(online)
  } catch (error) {
    return console.log('@online', error)
  }
}

export default online