import dns from 'node:dns'
import mongoose from 'mongoose'

export const connectDB = async (uri) => {
  // Windows/network DNS often blocks Node SRV lookups for mongodb+srv URIs.
  dns.setServers(['8.8.8.8', '8.8.4.4'])

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
  })
  console.log('MongoDB connected')
}
