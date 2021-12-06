import type { Cors } from '../env/cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import corsPackage from 'cors'
import session from 'express-session'
import env from '../env/env'

const createApp = (cors: Cors) => {
  const app = express()

  app.set("trust proxy", 1)
  app.use(express.json({ limit: '30mb' }))

  app.use(corsPackage(cors))
  app.use(cookieParser())
  
  app.use(session({
    secret: env.SECRET,
    cookie: { 
      secure: env.ENVIRONMENT === 'LIVE',
      sameSite: env.ENVIRONMENT === 'LIVE' ? 'lax' : 'lax',
      httpOnly: true, 
      maxAge: 1000 * 60 * 60 * 24 
    }
  }))

  return app
}

export default createApp