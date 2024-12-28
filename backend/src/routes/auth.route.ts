import express, { Request, RequestHandler, Response } from 'express'
import {
  check,
  login,
  logout,
  signup,
  updateProfile
} from '../controllers/auth.controller'
import { protectRoute } from '../middleware/auth.middleware'

const authRoutes = express.Router()

authRoutes.post('/signup', async (req: Request, res: Response) => {
  try {
    await signup(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

authRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    await login(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

authRoutes.post('/logout', (req: Request, res: Response) => {
  try {
    logout(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

authRoutes.put(
  '/update-profile',
  protectRoute,
  async (req: Request, res: Response) => {
    try {
      await updateProfile(req, res)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
)

authRoutes.get('/check', protectRoute, (req: Request, res: Response) => {
  try {
    check(req, res)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default authRoutes
