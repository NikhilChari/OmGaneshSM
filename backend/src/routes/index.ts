import { Router } from 'express'
import contactRoutes from './contactRoutes'
import membershipRoutes from './membershipRoutes'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Om Ganesh API',
  })
})

router.use('/contact', contactRoutes)
router.use('/memberships', membershipRoutes)

export default router