import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import {
  getEvent,
  listEvents,
  submitEvent,
} from '../controllers/eventController'

const router = Router()

// Public
router.get('/', listEvents)
router.get('/:slug', getEvent)

// Admin only
router.post('/', authMiddleware, submitEvent)

export default router