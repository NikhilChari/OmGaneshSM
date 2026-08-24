import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import pool from './config/database'
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

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')

    res.status(200).json({
      success: true,
      message: 'Om Ganesh API is running',
      database: 'connected',
    })
  } catch (error) {
    console.error('Database health check failed:', error)

    res.status(503).json({
      success: false,
      message: 'Om Ganesh API is running',
      database: 'disconnected',
    })
  }
})

app.use('/api', routes)

export default app