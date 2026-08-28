import type { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import pool from '../config/database'
import type { RowDataPacket, ResultSetHeader } from 'mysql2'

const uploadsDirectory = path.resolve(process.cwd(), 'uploads')

function getUploadedImageUrl(req: Request) {
  if (!req.file) return null
  return `${req.protocol}://${req.get('host')}/uploads/events/${req.file.filename}`
}

function getStoredFilePath(imageUrl: string | null | undefined) {
  if (!imageUrl) return null

  try {
    const parsed = new URL(imageUrl)
    const pathname = decodeURIComponent(parsed.pathname)
    const prefix = '/uploads/'
    if (!pathname.startsWith(prefix)) return null

    const relative = pathname.slice(prefix.length).replace(/\//g, path.sep)
    const root = path.resolve(uploadsDirectory)
    const filePath = path.resolve(root, relative)

    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
      return null
    }

    return filePath
  } catch {
    return null
  }
}

async function removeUploadedFile(imageUrl: string | null | undefined) {
  const filePath = getStoredFilePath(imageUrl)
  if (!filePath) return

  try {
    await fs.unlink(filePath)
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error
      ? error.code
      : undefined
    if (code !== 'ENOENT') {
      console.error('Failed to remove event image:', error)
    }
  }
}

export async function uploadEventImage(req: Request, res: Response) {
  const eventId = Number(req.params.id)
  const uploadedUrl = getUploadedImageUrl(req)

  try {
    if (!Number.isInteger(eventId) || eventId <= 0) {
      await removeUploadedFile(uploadedUrl)
      return res.status(400).json({ success: false, message: 'Invalid event ID.' })
    }

    if (!uploadedUrl) {
      return res.status(400).json({ success: false, message: 'An image file is required.' })
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT image_url FROM events WHERE id = ? LIMIT 1',
      [eventId],
    )

    if (!rows[0]) {
      await removeUploadedFile(uploadedUrl)
      return res.status(404).json({ success: false, message: 'Event not found.' })
    }

    const previousUrl = rows[0].image_url ? String(rows[0].image_url) : null

    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE events SET image_url = ? WHERE id = ?',
      [uploadedUrl, eventId],
    )

    if (result.affectedRows === 0) {
      await removeUploadedFile(uploadedUrl)
      return res.status(404).json({ success: false, message: 'Event not found.' })
    }

    if (previousUrl) {
      await removeUploadedFile(previousUrl)
    }

    return res.status(200).json({
      success: true,
      message: 'Event image uploaded successfully.',
      imageUrl: uploadedUrl,
    })
  } catch (error) {
    await removeUploadedFile(uploadedUrl)
    console.error('Event image upload failed:', error)
    return res.status(500).json({
      success: false,
      message: 'Unable to upload event image.',
    })
  }
}
