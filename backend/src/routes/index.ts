import { Router } from 'express'
import contactRoutes from './contactRoutes'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Om Ganesh API',
  })
})

router.use('/contact', contactRoutes)

export default router