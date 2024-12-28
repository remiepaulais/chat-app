import express from 'express'
import authRoutes from './routes/auth.route'
import dotenv from 'dotenv'
import { connectDB } from './lib/db'

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`)
  connectDB()
})
