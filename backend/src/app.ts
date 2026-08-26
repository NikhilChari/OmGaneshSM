import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import path from 'path'

import pool from './config/database'
import routes from './routes'

const app = express()
app.use(
  '/uploads',
  express.static(
    path.resolve(
      process.cwd(),
      'uploads',
    ),
  ),
)

app.disable('x-powered-by')

app.use(
  helmet(),
)

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      'http://localhost:5173',
  }),
)

app.use(
  express.json({
    limit: '1mb',
  }),
)

app.use(
  express.urlencoded({
    extended: true,
    limit: '1mb',
  }),
)

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
})

app.use('/api', apiLimiter)

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')

    return res.status(200).json({
      success: true,
      message: 'Om Ganesh API is running',
      database: 'connected',
    })
  } catch (error) {
    console.error('Database health check failed:', error)

    return res.status(503).json({
      success: false,
      message: 'Om Ganesh API is running',
      database: 'disconnected',
    })
  }
})

app.use('/api', routes)

export default app