import express from 'express'
import 'dotenv/config'
import configRouter from './routes/configRoutes.js'
import { connectDB } from './config/db.js'

connectDB()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use('/api', configRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    console.log(`CLICK ON THIS LINK http://127.0.0.1:${PORT}/api/book/all`);
})