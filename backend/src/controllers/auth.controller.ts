import { Request, Response } from 'express'

export const signup = (_: Request, res: Response) => {
  res.send('Signup Route')
}

export const login = (_: Request, res: Response) => {
  res.send('Login Route')
}

export const logout = (_: Request, res: Response) => {
  res.send('Logout Route')
}
