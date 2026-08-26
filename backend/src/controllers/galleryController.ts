import type { Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'

import {
  createAlbum,
  createGalleryImage,
  deleteAlbum,
  deleteGalleryImage,
  getAlbumById,
  getGalleryImagesByAlbumId,
  getGalleryImageById,
  getPublishedAlbumBySlug,
  getPublishedAlbums,
  getAllAlbums,
  updateAlbum,
  updateGalleryImage,
  type CreateAlbumInput,
  type UpdateAlbumInput,
} from '../services/galleryService'

const uploadsDirectory = path.resolve(
  process.cwd(),
  'uploads',
)

function getUploadedImageUrl(
  req: Request,
) {
  if (!req.file) {
    return null
  }

  return `${req.protocol}://${req.get('host')}/uploads/gallery/${req.file.filename}`
}

function getStoredFilePath(
  imageUrl: string,
) {
  try {
    const parsedUrl = new URL(imageUrl)

    const pathname = decodeURIComponent(
      parsedUrl.pathname,
    )

    const uploadsPrefix = '/uploads/'

    if (!pathname.startsWith(uploadsPrefix)) {
      return null
    }

    const relativePath = pathname
      .slice(uploadsPrefix.length)
      .replace(/\//g, path.sep)

    const uploadsRoot = path.resolve(
      uploadsDirectory,
    )

    const filePath = path.resolve(
      uploadsRoot,
      relativePath,
    )

    /*
     * Prevent paths such as:
     *
     * /uploads/../something
     *
     * from escaping the uploads directory.
     */
    if (
      filePath !== uploadsRoot &&
      !filePath.startsWith(
        `${uploadsRoot}${path.sep}`,
      )
    ) {
      return null
    }

    return filePath
  } catch {
    return null
  }
}

async function removeUploadedFile(
  imageUrl: string | null | undefined,
) {
  if (!imageUrl) {
    return
  }

  const filePath =
    getStoredFilePath(imageUrl)

  if (!filePath) {
    return
  }

  try {
    await fs.unlink(filePath)
  } catch (error) {
    const code =
      error &&
      typeof error === 'object' &&
      'code' in error
        ? error.code
        : undefined

    /*
     * ENOENT simply means the file
     * was already removed.
     */
    if (code !== 'ENOENT') {
      console.error(
        'Failed to remove uploaded gallery file:',
        error,
      )
    }
  }
}

export async function listAdminAlbums(
  _req: Request,
  res: Response,
) {
  try {
    const albums =
      await getAllAlbums()

    return res.status(200).json({
      success: true,
      albums,
    })
  } catch (error) {
    console.error(
      'Failed to fetch admin gallery albums:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch gallery albums.',
    })
  }
}
export async function listAlbums(
  _req: Request,
  res: Response,
) {
  try {
    const albums =
      await getPublishedAlbums()

    return res.status(200).json({
      success: true,
      albums,
    })
  } catch (error) {
    console.error(
      'Failed to fetch gallery albums:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch gallery albums.',
    })
  }
}

export async function getAlbum(
  req: Request,
  res: Response,
) {
  try {
    const slug =
      Array.isArray(req.params.slug)
        ? req.params.slug[0]
        : req.params.slug

    const album =
      await getPublishedAlbumBySlug(
        slug,
      )

    if (!album) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery album not found.',
      })
    }

    return res.status(200).json({
      success: true,
      album,
    })
  } catch (error) {
    console.error(
      'Failed to fetch gallery album:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to fetch gallery album.',
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
    } =
      req.body as CreateAlbumInput

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message:
          'Title and slug are required.',
      })
    }

    const result =
      await createAlbum({
        title: title.trim(),
        slug: slug.trim(),
        description:
          description?.trim(),
        cover_image_url:
          cover_image_url?.trim(),
        status,
      })

    return res.status(201).json({
      success: true,
      message:
        'Gallery album created successfully.',
      albumId: result.insertId,
    })
  } catch (error) {
    console.error(
      'Gallery album creation failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to create gallery album.',
    })
  }
}

export async function editAlbum(
  req: Request,
  res: Response,
) {
  try {
    const albumId =
      Number(req.params.id)

    if (
      !Number.isInteger(albumId) ||
      albumId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid album ID.',
      })
    }

    const album =
      await getAlbumById(albumId)

    if (!album) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery album not found.',
      })
    }

    const {
      title,
      slug,
      description,
      cover_image_url,
      status,
    } =
      req.body as UpdateAlbumInput

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message:
          'Title and slug are required.',
      })
    }

    const result =
      await updateAlbum(
        albumId,
        {
          title: title.trim(),
          slug: slug.trim(),
          description:
            description?.trim(),
          cover_image_url:
            cover_image_url?.trim(),
          status,
        },
      )

    if (
      result.affectedRows === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery album not found.',
      })
    }

    return res.status(200).json({
      success: true,
      message:
        'Gallery album updated successfully.',
    })
  } catch (error) {
    console.error(
      'Gallery album update failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to update gallery album.',
    })
  }
}

export async function removeAlbum(
  req: Request,
  res: Response,
) {
  try {
    const albumId =
      Number(req.params.id)

    if (
      !Number.isInteger(albumId) ||
      albumId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid album ID.',
      })
    }

    const album =
      await getAlbumById(albumId)

    if (!album) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery album not found.',
      })
    }

    /*
     * Get all image records BEFORE deleting
     * the album.
     *
     * This is necessary because the database
     * may remove the gallery_images rows
     * through ON DELETE CASCADE.
     */
    const images =
      await getGalleryImagesByAlbumId(
        albumId,
      )

    /*
     * Delete the album from the database.
     *
     * Related gallery_images rows are
     * expected to be removed by the
     * database foreign-key cascade.
     */
    const result =
      await deleteAlbum(albumId)

    if (
      result.affectedRows === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery album not found.',
      })
    }

    /*
     * Database records are now removed.
     *
     * Remove the actual uploaded files
     * from uploads/gallery.
     */
    for (const image of images) {
      await removeUploadedFile(
        String(image.image_url),
      )
    }

    return res.status(200).json({
      success: true,
      message:
        'Gallery album deleted successfully.',
    })
  } catch (error) {
    console.error(
      'Gallery album deletion failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to delete gallery album.',
    })
  }
}

export async function submitGalleryImage(
  req: Request,
  res: Response,
) {
  try {
    const albumId =
      Number(req.params.albumId)

    if (
      !Number.isInteger(albumId) ||
      albumId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid album ID.',
      })
    }

    const album =
      await getAlbumById(albumId)

    if (!album) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery album not found.',
      })
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          'Gallery image file is required.',
      })
    }

    const imageUrl =
      getUploadedImageUrl(req)

    if (!imageUrl) {
      await removeUploadedFile(
        `${req.protocol}://${req.get('host')}/uploads/gallery/${req.file.filename}`,
      )

      return res.status(500).json({
        success: false,
        message:
          'Unable to determine uploaded image URL.',
      })
    }

    const {
      caption,
      sort_order,
    } =
      req.body as {
        caption?: string
        sort_order?: string | number
      }

    const parsedSortOrder =
      sort_order !== undefined
        ? Number(sort_order)
        : 0

    if (
      !Number.isInteger(
        parsedSortOrder,
      ) ||
      parsedSortOrder < 0
    ) {
      await removeUploadedFile(
        imageUrl,
      )

      return res.status(400).json({
        success: false,
        message:
          'Sort order must be a non-negative integer.',
      })
    }

    try {
      const result =
        await createGalleryImage({
          album_id: albumId,
          image_url: imageUrl,
          caption:
            caption?.trim(),
          sort_order:
            parsedSortOrder,
        })

      return res.status(201).json({
        success: true,
        message:
          'Gallery image uploaded successfully.',
        imageId:
          result.insertId,
        imageUrl,
      })
    } catch (error) {
      /*
       * Database insertion failed.
       *
       * Remove the uploaded file so that
       * we do not leave an orphaned file.
       */
      await removeUploadedFile(
        imageUrl,
      )

      throw error
    }
  } catch (error) {
    console.error(
      'Gallery image creation failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to upload gallery image.',
    })
  }
}

export async function editGalleryImage(
  req: Request,
  res: Response,
) {
  try {
    const albumId =
      Number(req.params.albumId)

    const imageId =
      Number(req.params.imageId)

    if (
      !Number.isInteger(albumId) ||
      albumId <= 0 ||
      !Number.isInteger(imageId) ||
      imageId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid album or image ID.',
      })
    }

    const image =
      await getGalleryImageById(
        imageId,
        albumId,
      )

    if (!image) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery image not found.',
      })
    }

    const {
      caption,
      sort_order,
    } =
      req.body as {
        caption?: string
        sort_order?: string | number
      }

    const parsedSortOrder =
      sort_order !== undefined
        ? Number(sort_order)
        : Number(
            image.sort_order ?? 0,
          )

    if (
      !Number.isInteger(
        parsedSortOrder,
      ) ||
      parsedSortOrder < 0
    ) {
      if (req.file) {
        await removeUploadedFile(
          getUploadedImageUrl(req),
        )
      }

      return res.status(400).json({
        success: false,
        message:
          'Sort order must be a non-negative integer.',
      })
    }

    let imageUrl =
      String(image.image_url)

    let replacementUrl:
      | string
      | null = null

    /*
     * If a new file was uploaded,
     * prepare its URL.
     *
     * If no new file was uploaded,
     * retain the existing image URL.
     */
    if (req.file) {
      replacementUrl =
        getUploadedImageUrl(req)

      if (!replacementUrl) {
        await removeUploadedFile(
          getUploadedImageUrl(req),
        )

        return res.status(500).json({
          success: false,
          message:
            'Unable to determine uploaded image URL.',
        })
      }

      imageUrl =
        replacementUrl
    }

    try {
      const result =
        await updateGalleryImage(
          imageId,
          albumId,
          {
            image_url:
              imageUrl,
            caption:
              caption?.trim(),
            sort_order:
              parsedSortOrder,
          },
        )

      if (
        result.affectedRows === 0
      ) {
        /*
         * Database update failed.
         * Remove the newly uploaded
         * replacement file.
         */
        if (replacementUrl) {
          await removeUploadedFile(
            replacementUrl,
          )
        }

        return res.status(404).json({
          success: false,
          message:
            'Gallery image not found.',
        })
      }

      /*
       * Database update succeeded.
       *
       * Only now is it safe to remove
       * the old physical file.
       */
      if (replacementUrl) {
        await removeUploadedFile(
          String(image.image_url),
        )
      }

      return res.status(200).json({
        success: true,
        message:
          'Gallery image updated successfully.',
        imageUrl,
      })
    } catch (error) {
      /*
       * Database update failed.
       *
       * Remove the new replacement file.
       */
      if (replacementUrl) {
        await removeUploadedFile(
          replacementUrl,
        )
      }

      throw error
    }
  } catch (error) {
    console.error(
      'Gallery image update failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to update gallery image.',
    })
  }
}

export async function removeGalleryImage(
  req: Request,
  res: Response,
) {
  try {
    const albumId =
      Number(req.params.albumId)

    const imageId =
      Number(req.params.imageId)

    if (
      !Number.isInteger(albumId) ||
      albumId <= 0 ||
      !Number.isInteger(imageId) ||
      imageId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Invalid album or image ID.',
      })
    }

    const image =
      await getGalleryImageById(
        imageId,
        albumId,
      )

    if (!image) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery image not found.',
      })
    }

    const result =
      await deleteGalleryImage(
        imageId,
        albumId,
      )

    if (
      result.affectedRows === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          'Gallery image not found.',
      })
    }

    /*
     * Delete the physical uploaded file
     * after the database record has been
     * successfully deleted.
     */
    await removeUploadedFile(
      String(image.image_url),
    )

    return res.status(200).json({
      success: true,
      message:
        'Gallery image deleted successfully.',
    })
  } catch (error) {
    console.error(
      'Gallery image deletion failed:',
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        'Unable to delete gallery image.',
    })
  }
}