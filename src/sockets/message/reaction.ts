import type Event from '../../types/Event'

import type User from '../../types/User'
import Message from '../../models/Message'

const reaction: Event = async (data, io, socket) => {
  const { userId } = socket.data
  const { reaction, messageId, callback } = data
    
  try {
    console.log('hello')
  } catch (error) {
    return console.log(error)
  }
}

export default reaction