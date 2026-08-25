import type { Request, Response } from 'express'
import {
  createEvent,
  deleteEvent,
  getEventBySlug,
  getPublishedEvents,
  updateEvent,
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

export async function editEvent(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params
    const eventId = Number(id)

    if (!Number.isInteger(eventId) || eventId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID.',
      })
    }

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

    const result = await updateEvent(eventId, {
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

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully.',
    })
  } catch (error) {
    console.error('Event update failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to update event.',
    })
  }
}

export async function removeEvent(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params
    const eventId = Number(id)

    if (!Number.isInteger(eventId) || eventId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID.',
      })
    }

    const result = await deleteEvent(eventId)

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Event deleted successfully.',
    })
  } catch (error) {
    console.error('Event deletion failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to delete event.',
    })
  }
}