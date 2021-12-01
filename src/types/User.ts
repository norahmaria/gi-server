import { Document } from 'mongoose'

export interface User extends Document {
  username: string,
  email: string,
  password: string,
  following: string[],
  followers: string[]
  avatar: string,
  _id: string
}

export default User