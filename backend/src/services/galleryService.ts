import pool from '../config/database'
import type {
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2'

export interface CreateAlbumInput {
  title: string
  slug: string
  description?: string
  cover_image_url?: string
  status?: 'draft' | 'published'
}

export interface UpdateAlbumInput {
  title?: string
  slug?: string
  description?: string
  cover_image_url?: string
  status?: 'draft' | 'published'
}

export interface CreateGalleryImageInput {
  album_id: number
  image_url: string
  caption?: string
  sort_order?: number
}

export interface UpdateGalleryImageInput {
  image_url?: string
  caption?: string
  sort_order?: number
}

export async function createAlbum(
  data: CreateAlbumInput,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO gallery_albums
        (
          title,
          slug,
          description,
          cover_image_url,
          status
        )
      VALUES
        (?, ?, ?, ?, ?)
    `,
    [
      data.title,
      data.slug,
      data.description || null,
      data.cover_image_url || null,
      data.status || 'published',
    ],
  )

  return result
}

export async function getPublishedAlbums() {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        title,
        slug,
        description,
        cover_image_url,
        status,
        created_at,
        updated_at
      FROM gallery_albums
      WHERE status = 'published'
      ORDER BY created_at DESC
    `,
  )

  return rows
}

export async function getPublishedAlbumBySlug(
  slug: string,
) {
  const [albums] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        title,
        slug,
        description,
        cover_image_url,
        status,
        created_at,
        updated_at
      FROM gallery_albums
      WHERE slug = ?
        AND status = 'published'
      LIMIT 1
    `,
    [slug],
  )

  const album = albums[0]

  if (!album) {
    return null
  }

  const [images] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        album_id,
        image_url,
        caption,
        sort_order,
        created_at
      FROM gallery_images
      WHERE album_id = ?
      ORDER BY sort_order ASC, id ASC
    `,
    [album.id],
  )

  return {
    ...album,
    images,
  }
}

export async function createGalleryImage(
  data: CreateGalleryImageInput,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      INSERT INTO gallery_images
        (
          album_id,
          image_url,
          caption,
          sort_order
        )
      VALUES
        (?, ?, ?, ?)
    `,
    [
      data.album_id,
      data.image_url,
      data.caption || null,
      data.sort_order ?? 0,
    ],
  )

  return result
}

export async function getAlbumById(
  albumId: number,
) {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        status
      FROM gallery_albums
      WHERE id = ?
      LIMIT 1
    `,
    [albumId],
  )

  return rows[0] || null
}

export async function updateAlbum(
  albumId: number,
  data: UpdateAlbumInput,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    {
      sql: `
        UPDATE gallery_albums
        SET
          title = ?,
          slug = ?,
          description = ?,
          cover_image_url = ?,
          status = ?
        WHERE id = ?
      `,
      values: [
        data.title,
        data.slug,
        data.description || null,
        data.cover_image_url || null,
        data.status || 'published',
        albumId,
      ],
    },
  )

  return result
}

export async function deleteAlbum(
  albumId: number,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    `
      DELETE FROM gallery_albums
      WHERE id = ?
    `,
    [albumId],
  )

  return result
}

export async function updateGalleryImage(
  imageId: number,
  albumId: number,
  data: UpdateGalleryImageInput,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    {
      sql: `
        UPDATE gallery_images
        SET
          image_url = ?,
          caption = ?,
          sort_order = ?
        WHERE id = ?
          AND album_id = ?
      `,
      values: [
        data.image_url,
        data.caption || null,
        data.sort_order ?? 0,
        imageId,
        albumId,
      ],
    },
  )

  return result
}

export async function getGalleryImageById(
  imageId: number,
  albumId: number,
) {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `
      SELECT
        id,
        album_id,
        image_url,
        caption,
        sort_order,
        created_at
      FROM gallery_images
      WHERE id = ?
        AND album_id = ?
      LIMIT 1
    `,
    [imageId, albumId],
  )

  return rows[0] || null
}
export async function deleteGalleryImage(
  imageId: number,
  albumId: number,
) {
  const [result] = await pool.execute<ResultSetHeader>(
    {
      sql: `
        DELETE FROM gallery_images
        WHERE id = ?
          AND album_id = ?
      `,
      values: [
        imageId,
        albumId,
      ],
    },
  )

  return result
}