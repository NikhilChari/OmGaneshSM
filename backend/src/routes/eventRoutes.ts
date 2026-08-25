import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import {
  editEvent,
  getEvent,
  listEvents,
  removeEvent,
  submitEvent,
} from '../controllers/eventController'

const router = Router()

// Public
router.get('/', listEvents)
router.get('/:slug', getEvent)

// Admin only
router.post('/', authMiddleware, submitEvent)
router.put('/:id', authMiddleware, editEvent)
router.delete('/:id', authMiddleware, removeEvent)

export default router