import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import apiResponse from './utils/apiResponse.js'

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.post('*', (req, res)=>{
    res.send("url does not exist")
})


// Global error handling midllerware
app.use((err, req, res, _)=>{
    console.error("Error, ", err)
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    apiResponse.error(res, message, {}, statusCode)
})
export default app;