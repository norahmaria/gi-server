import type Event from '../types/Event'

import User from '../models/User'

const disconnect: Event = async (data, io, socket) => {  
  socket.leave(socket.data.userId)

  try {
    const users = (await io.fetchSockets()).map(({ data }) => data.userId)
    const user = await User.findById(socket.data.userId)
  
    const online = users.filter(id => {
      if (user?.following.includes(id) && user?.followers.includes(id)) return true
    })
  
    for (let i = 0; i < online.length; i++) {
      io.to(online[i]).emit('online/removed', { userId: socket.data.userId })
    }
  
    socket.disconnect()
  } catch (error) {
    return console.log('@disconnect', error)
  }
} 

export default disconnect