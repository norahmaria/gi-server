import type Event from '../../types/Event'

import Message from '../../models/Message'
import Chat from '../../models/Chat'

const create: Event = async (data, io, socket) => {
  const { message, chatId, reciever, callback } = data
  const { userId } = socket.data
 
  if (message === '' || !userId) return

  const usersInChat = await io.in(chatId).fetchSockets()
  const recieverIsInChat = usersInChat.some(({ data }) => data.userId === reciever._id)

  try {
    const messageDocument = await Message.create({
      chatId,
      sender: userId,
      message,
      createdAt: new Date().toISOString(),
      read: recieverIsInChat,
    })

    await messageDocument.populate('sender')

    const chat = await Chat.findByIdAndUpdate(chatId, {
      latestMessage: messageDocument._id
    })

    chat?.users.forEach(user => {
      if (user._id === reciever._id) {
        if (!recieverIsInChat) io.to(user.toString()).emit('chat/update')
      } else {
        io.to(user.toString()).emit('chat/update')
      }
    })
      
    io.to(chatId.toString()).emit('message/created', { messageDocument, chatId })
    callback()
  } catch (error) {
    return console.log(error)
  }
}

export default create