import express from 'express'
import { protectRoute } from '../middleware/auth.middleware'
import {
  getMessages,
  getUsersForSidebar,
  sendMessage
} from '../controllers/message.controller'

const messageRoutes = express.Router()

messageRoutes.get('/users', protectRoute, getUsersForSidebar)

messageRoutes.get('/:id', protectRoute, getMessages)

messageRoutes.post('/send/:id', protectRoute, sendMessage)

export default messageRoutes
