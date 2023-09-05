import mongoose from 'mongoose'

export const connectMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connection is Successful")
    } catch (error) {
        console.log("Error During Connection" + error)
    }
}