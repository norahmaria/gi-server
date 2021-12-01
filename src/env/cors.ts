import env from './env'

export type Cors = {
  origin: string,
  credentials: boolean
}

const cors: Cors = {
  origin: env.FRONT_END,
  credentials: true
}

export default cors