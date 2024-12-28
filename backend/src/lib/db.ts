import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI as string)
    console.log(`MongoDB connected : ${connect.connection.host}`)
  } catch (err) {
    console.log(`MongoDB connection error ${err.message}`)
  }
}
