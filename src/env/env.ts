import dotenv from 'dotenv'
dotenv.config({ path: './src/env/.env' })

export default {
  FRONT_END: process.env.FRONT_END as string,
  SECRET: process.env.SECRET as string,
  MONGO_DB: process.env.MONGO_DB as string,
  ENVIRONMENT: process.env.ENVIRONMENT as string
}