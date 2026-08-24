import pool from '../config/database'
import type {
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2'

export interface CreateNewsInput {
  title: string
  slug: string
  excerpt?: string
  content: string
  image_url?: string
  published_at?: string
  status?: 'draft' | 'published'
}

export async function createNews(
  data: CreateNewsInput,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO news
        (
          title,
          slug,
          excerpt,
          content,
          image_url,
          published_at,
          status
        )
      VALUES
        (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.title,
      data.slug,
      data.excerpt || null,
      data.content,
      data.image_url || null,
      data.published_at || null,
      data.status || 'draft',
    ],
  )

  return result
}

export async function getPublishedNews() {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        title,
        slug,
        excerpt,
        content,
        image_url,
        published_at,
        status,
        created_at,
        updated_at
      FROM news
      WHERE status = 'published'
      ORDER BY published_at DESC, created_at DESC
    `,
  )

  return rows
}

export async function getPublishedNewsBySlug(
  slug: string,
) {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        title,
        slug,
        excerpt,
        content,
        image_url,
        published_at,
        status,
        created_at,
        updated_at
      FROM news
      WHERE slug = ?
        AND status = 'published'
      LIMIT 1
    `,
    [slug],
  )

  return rows[0] || null
}