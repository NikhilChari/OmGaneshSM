import { Router } from 'express'

import { authMiddleware } from '../middleware/authMiddleware'

import {
  changeMyPassword,
  getMyProfile,
  updateMyProfile,
} from '../controllers/adminController'

const router = Router()

router.use(authMiddleware)

router.get('/me', getMyProfile)

router.put('/me', updateMyProfile)

router.put(
  '/me/password',
  changeMyPassword,
)

export default router