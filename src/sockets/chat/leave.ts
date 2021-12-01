import type Event from '../../types/Event'

const leave: Event = (data, io, socket) => {
  const { chatId, callback } = data
  socket.leave(chatId)
  callback()
}

export default leave