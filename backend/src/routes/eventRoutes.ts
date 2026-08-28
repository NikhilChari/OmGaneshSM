import { Router, type Request, type Response } from 'express'

import {
  listEvents,
  getEvent,
  submitEvent,
  editEvent,
  removeEvent,
} from '../controllers/eventController'
import { uploadEventImage } from '../controllers/eventImageController'
import { authMiddleware } from '../middleware/authMiddleware'
import { eventUpload } from '../middleware/eventUploadMiddleware'
import pool from '../config/database'
import type { RowDataPacket } from 'mysql2'

const router = Router()

router.get('/', listEvents)

router.get('/admin', authMiddleware, listAdminEvents)

router.post('/', authMiddleware, submitEvent)
router.put('/:id', authMiddleware, editEvent)
router.delete('/:id', authMiddleware, removeEvent)

// Upload or replace an event image. The image URL is still stored in events.image_url.
router.post('/:id/image', authMiddleware, eventUpload.single('image'), uploadEventImage)
router.put('/:id/image', authMiddleware, eventUpload.single('image'), uploadEventImage)

router.get('/:slug', getEvent)

async function listAdminEvents(_req: Request, res: Response) {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `
        SELECT
          id, title, slug, description, event_date,
          start_time, end_time, location, image_url,
          status, created_at, updated_at
        FROM events
        ORDER BY event_date ASC, start_time ASC
      `,
    )

    return res.status(200).json({ success: true, events: rows })
  } catch (error) {
    console.error('Failed to fetch admin events:', error)
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch admin events.',
    })
  }
}

export default router
