import dotenv from "dotenv"
import mongoose from 'mongoose';
import express from "express"
import PostRoutes from "./routes/post"
import cors from "cors"
import * as redis from "redis"
import client from "./client";
dotenv.config()

const app = express()


app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000',]
}))
app.use('/api', PostRoutes)


async function Run() {
    client.connect()
        .then(() => console.log("Redis connected"))
    const port = process.env.PORT || 8000
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected'))
        .catch((error) => console.log(`MongoDB could not counnect, because ${error}`))
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

Run()