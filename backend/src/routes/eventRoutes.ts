import { Router, type Request, type Response } from 'express'

import {
  listEvents,
  getEvent,
  submitEvent,
  editEvent,
  removeEvent,
} from '../controllers/eventController'

import { authMiddleware } from '../middleware/authMiddleware'

import pool from '../config/database'
import type { RowDataPacket } from 'mysql2'

const router = Router()

/*
 * =====================================================
 * PUBLIC EVENTS
 * =====================================================
 */

// Get all published events
router.get('/', listEvents)

/*
 * =====================================================
 * ADMIN EVENTS
 * =====================================================
 */

// Get all events for admin
router.get(
  '/admin',
  authMiddleware,
  listAdminEvents,
)

// Create event
router.post('/', authMiddleware, submitEvent)

// Update event
router.put('/:id', authMiddleware, editEvent)

// Delete event
router.delete('/:id', authMiddleware, removeEvent)

/*
 * =====================================================
 * PUBLIC EVENT DETAIL
 * =====================================================
 */

// Get one published event by slug
router.get('/:slug', getEvent)

async function listAdminEvents(
  _req: Request,
  res: Response,
) {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `
        SELECT
          id,
          title,
          slug,
          description,
          event_date,
          start_time,
          end_time,
          location,
          image_url,
          status,
          created_at,
          updated_at
        FROM events
        ORDER BY event_date ASC, start_time ASC
      `,
    )

    return res.status(200).json({
      success: true,
      events: rows,
    })
  } catch (error) {
    console.error(
      'Failed to fetch admin events:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch admin events.',
    })
  }
}

export default router