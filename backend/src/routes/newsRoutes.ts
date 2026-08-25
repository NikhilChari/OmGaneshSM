import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'

import {
  getNews,
  listNews,
  submitNews,
} from '../controllers/newsController'

const router = Router()

router.get('/', listNews)
router.get('/:slug', getNews)

router.post('/', authMiddleware, submitNews)

export default router