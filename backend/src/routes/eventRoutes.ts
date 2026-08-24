import { Router } from 'express'
import {
  getEvent,
  listEvents,
  submitEvent,
} from '../controllers/eventController'

const router = Router()

router.get('/', listEvents)
router.get('/:slug', getEvent)
router.post('/', submitEvent)

export default router