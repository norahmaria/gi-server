import mongoose from 'mongoose'
import env from '../env/env'

const connectMongo = async () => {
  try {
    await mongoose.connect(env.MONGO_DB)
  } catch (error) {
    console.log('@mongo', error)
  }
}

export default connectMongo