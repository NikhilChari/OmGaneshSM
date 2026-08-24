import type { Request, Response } from 'express'

import {
  createAlbum,
  createGalleryImage,
  getAlbumById,
  getPublishedAlbumBySlug,
  getPublishedAlbums,
  type CreateAlbumInput,
  type CreateGalleryImageInput,
} from '../services/galleryService'

export async function listAlbums(
  _req: Request,
  res: Response,
) {
  try {
    const albums = await getPublishedAlbums()

    return res.status(200).json({
      success: true,
      albums,
    })
  } catch (error) {
    console.error('Failed to fetch gallery albums:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch gallery albums.',
    })
  }
}

export async function getAlbum(
  req: Request,
  res: Response,
) {
  try {
    const slug = Array.isArray(req.params.slug)
      ? req.params.slug[0]
      : req.params.slug

    const album = await getPublishedAlbumBySlug(slug)

    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'Gallery album not found.',
      })
    }

    return res.status(200).json({
      success: true,
      album,
    })
  } catch (error) {
    console.error('Failed to fetch gallery album:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch gallery album.',
    })
  }
}

export async function submitAlbum(
  req: Request,
  res: Response,
) {
  try {
    const {
      title,
      slug,
      description,
      cover_image_url,
      status,
    } = req.body as CreateAlbumInput

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Title and slug are required.',
      })
    }

    const result = await createAlbum({
      title: title.trim(),
      slug: slug.trim(),
      description: description?.trim(),
      cover_image_url: cover_image_url?.trim(),
      status,
    })

    return res.status(201).json({
      success: true,
      message: 'Gallery album created successfully.',
      albumId: result.insertId,
    })
  } catch (error) {
    console.error('Gallery album creation failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to create gallery album.',
    })
  }
}

export async function submitGalleryImage(
  req: Request,
  res: Response,
) {
  try {
    const albumId = Number(req.params.albumId)

    if (!Number.isInteger(albumId) || albumId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid album ID.',
      })
    }

    const {
      image_url,
      caption,
      sort_order,
    } = req.body as Omit<
      CreateGalleryImageInput,
      'album_id'
    >

    if (!image_url) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required.',
      })
    }

    const album = await getAlbumById(albumId)

    if (!album) {
      return res.status(404).json({
        success: false,
        message: 'Gallery album not found.',
      })
    }

    const result = await createGalleryImage({
      album_id: albumId,
      image_url: image_url.trim(),
      caption: caption?.trim(),
      sort_order:
        sort_order !== undefined
          ? Number(sort_order)
          : 0,
    })

    return res.status(201).json({
      success: true,
      message: 'Gallery image added successfully.',
      imageId: result.insertId,
    })
  } catch (error) {
    console.error('Gallery image creation failed:', error)

    return res.status(500).json({
      success: false,
      message: 'Unable to add gallery image.',
    })
  }
}