import type { Request, Response } from 'express'
import {
  createEvent,
  getEventBySlug,
  getPublishedEvents,
  type CreateEventInput,
} from '../services/eventService'

export async function listEvents(
  _req: Request,
  res: Response,
) {
  try {
    const events = await getPublishedEvents()

    return res.status(200).json({
      success: true,
      events,
    })
  } catch (error) {
    console.error('Failed to fetch events:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch events.',
    })
  }
}

export async function getEvent(
  req: Request,
  res: Response,
) {
  try {
    const { slug } = req.params

    if (typeof slug !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid event slug.',
      })
    }

    const event = await getEventBySlug(slug)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      })
    }

    return res.status(200).json({
      success: true,
      event,
    })
  } catch (error) {
    console.error('Failed to fetch event:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch event.',
    })
  }
}

export async function submitEvent(
  req: Request,
  res: Response,
) {
  try {
    const {
      title,
      slug,
      description,
      event_date,
      start_time,
      end_time,
      location,
      image_url,
      status,
    } = req.body as CreateEventInput

    if (!title || !slug || !event_date) {
      return res.status(400).json({
        success: false,
        message: 'Title, slug and event date are required.',
      })
    }

    const result = await createEvent({
      title: title.trim(),
      slug: slug.trim(),
      description: description?.trim(),
      event_date,
      start_time,
      end_time,
      location: location?.trim(),
      image_url: image_url?.trim(),
      status,
    })

    return res.status(201).json({
      success: true,
      message: 'Event created successfully.',
      eventId: result.insertId,
    })
  } catch (error) {
    console.error('Event creation failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to create event.',
    })
  }
}