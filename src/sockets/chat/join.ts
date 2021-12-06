import type Event from '../../types/Event'

import Chat from '../../models/Chat'
import Message from '../../models/Message'

const join: Event = async (data, io, socket) => {
  const { userId } = socket.data
  const { chatId, callback } = data
    
  try {
    socket.join(chatId)
  
    const unreadMessages = await Message.find({ 
      chatId, 
      read: false, 
      sender: { $ne: userId } 
    })
  
    for (let i = 0; i < unreadMessages.length; i++) {
      unreadMessages[i].read = true
      await unreadMessages[i].save()
    }
  
    const chat = await Chat.findById(chatId)
      .populate('latestMessage')
      .populate('users')
      .populate({
        path: 'latestMessage', 
        populate: {
        path: 'sender'
      }
    })
        
    io.to(userId).emit('chat/update')
    
    callback(chat)
  } catch (error) {
    return console.log('@chat/join', error)
  }
}

export default join