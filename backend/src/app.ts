import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import routes from './routes'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  }),
)

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Om Ganesh API is running',
  })
})

app.use('/api', routes)

export default app