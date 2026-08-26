import { Router } from 'express'

import newsRoutes from './newsRoutes'
import contactRoutes from './contactRoutes'
import membershipRoutes from './membershipRoutes'
import eventRoutes from './eventRoutes'
import galleryRoutes from './galleryRoutes'
import authRoutes from './authRoutes'
import adminRoutes from './adminRoutes'
import teamRoutes from './teamRoutes'

const router = Router()

router.get(
  '/',
  (_req, res) => {
    res.json({
      success: true,
      message:
        'Om Ganesh API',
    })
  },
)

router.use(
  '/contact',
  contactRoutes,
)

router.use(
  '/memberships',
  membershipRoutes,
)

router.use(
  '/events',
  eventRoutes,
)

router.use(
  '/gallery',
  galleryRoutes,
)

router.use(
  '/news',
  newsRoutes,
)

router.use(
  '/auth',
  authRoutes,
)

router.use(
  '/admin',
  adminRoutes,
)

router.use(
  '/team',
  teamRoutes,
)

export default router