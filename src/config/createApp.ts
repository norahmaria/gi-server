import type { Cors } from '../env/cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import corsPackage from 'cors'

const createApp = (cors: Cors) => {
  const app = express()

  app.use(corsPackage(cors))
  app.use(express.json({ limit: '30mb' }))
  app.use(cookieParser())
  app.use(express.json())

  return app
}

export default createApp