import mongoose from 'mongoose'

export const connectdb = async() =>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error Connection to Mongodb:${error.message}`)
    process.exit(1)
  }
}