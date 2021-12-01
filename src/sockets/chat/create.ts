import type Event from '../../types/Event'

import Chat from '../../models/Chat'

const create: Event = async (data, io, socket) => {
  const { userId } = socket.data
  const { startChatWith, callback } = data

  try {
    const existingChat = await Chat.findOne({ users: {
      $all: [userId, startChatWith]
    }})
      .populate('users')
      .populate('latestMessage')
      .populate({
        path: 'latestMessage', 
        populate: {
        path: 'sender'
      }
    })

    if (existingChat) return callback(existingChat)

    const chat = await Chat.create({
      users: [userId, startChatWith],
      initalizedBy: userId
    })

    await chat.populate('users')
    await chat.populate('latestMessage')
    await chat.populate({
      path: 'latestMessage', 
      populate: {
        path: 'sender'
      }
    })

    io.to(startChatWith).emit('chat/update')
    
    callback(chat)
  } catch (error) {
    return console.log('creatingChat', error)
  }
}

export default create