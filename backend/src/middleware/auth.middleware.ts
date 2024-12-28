import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { NextFunction, Request, RequestHandler, Response } from 'express'

export const protectRoute: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies[process.env.JWT_TOKEN_NAME]

    if (!token) {
      res.status(401).json({ message: 'Unauthorized - No token provided' })
      return
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      userID: string
    }

    if (!decodedToken) {
      res.status(401).json({ message: 'Unauthorized - Invalid token' })
      return
    }

    const user = await User.findById(decodedToken.userID).select('-password')

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    req.user = user

    next()
  } catch (err) {
    console.log(`Error in auth middleware ${err.message}`)
    res.status(401).json({ message: 'Unauthorized - Invalid token' })
    return
  }
}
