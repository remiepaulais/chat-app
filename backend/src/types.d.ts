import { Types } from 'mongoose'

interface IUser {
  _id: Types.ObjectId
  email: string
  fullName: string
  password: string
  profilePic: string
  createdAt: Date
  updatedAt: Date
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}
