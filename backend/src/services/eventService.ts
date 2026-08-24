import pool from '../config/database'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'

export interface CreateEventInput {
  title: string
  slug: string
  description?: string
  event_date: string
  start_time?: string
  end_time?: string
  location?: string
  image_url?: string
  status?: 'draft' | 'published' | 'cancelled'
}

export async function createEvent(data: CreateEventInput) {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO events
        (
          title,
          slug,
          description,
          event_date,
          start_time,
          end_time,
          location,
          image_url,
          status
        )
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.title,
      data.slug,
      data.description || null,
      data.event_date,
      data.start_time || null,
      data.end_time || null,
      data.location || null,
      data.image_url || null,
      data.status || 'draft',
    ],
  )

  return result
}

export async function getPublishedEvents() {
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
      WHERE status = 'published'
      ORDER BY event_date ASC, start_time ASC
    `,
  )

  return rows
}

export async function getEventBySlug(slug: string) {
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
      WHERE slug = ?
        AND status = 'published'
      LIMIT 1
    `,
    [slug],
  )

  return rows[0] || null
}