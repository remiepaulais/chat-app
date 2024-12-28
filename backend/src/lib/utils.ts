import { Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateToken = (userID: string, res: Response) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })

  res.cookie(process.env.JWT_TOKEN_NAME, token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
    httpOnly: true, // Prevent XSS attacks (cross-site scripting)
    sameSite: 'strict', // Ensure cookies are not sent with cross-site requests
    secure: process.env.NODE_ENV !== 'developement' // Only send cookies over HTTPS
  })

  return token
}
