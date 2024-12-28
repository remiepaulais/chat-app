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

authRoutes.post('/signup', signup)

authRoutes.post('/login', login)

authRoutes.post('/logout', logout)

authRoutes.put('/update-profile', protectRoute, updateProfile)

authRoutes.get('/check', protectRoute, check)

export default authRoutes
