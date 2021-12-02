import type { Cors } from '../env/cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import corsPackage from 'cors'

const createApp = (cors: Cors) => {
  const app = express()

  // TODO: Reminder this line is new
  app.set("trust proxy", 1)
  app.use(corsPackage(cors))
  app.use(express.json({ limit: '30mb' }))
  app.use(cookieParser())

  return app
}

export default createApp