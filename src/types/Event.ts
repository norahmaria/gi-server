import type { Server, Socket } from 'socket.io'

type Event = (data: any, io: Server, socket: Socket) => Promise<void> | void

export default Event