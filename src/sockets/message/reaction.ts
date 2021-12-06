import type Event from '../../types/Event'

import type User from '../../types/User'
import Message from '../../models/Message'

const reaction: Event = async (data, io, socket) => {
  const { userId } = socket.data
  const { reaction, messageId, callback } = data
    
  try {
    // Message reactions?
  } catch (error) {
    return console.log('@message/reaction', error)
  }
}

export default reaction