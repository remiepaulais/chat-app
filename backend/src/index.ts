import express from 'express'
import authRoutes from './routes/auth.route'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db'
import messageRoutes from './routes/message.route'

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`)
  connectDB()
})
