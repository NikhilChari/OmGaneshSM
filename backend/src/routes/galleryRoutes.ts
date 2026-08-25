import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'

import {
  editAlbum,
  editGalleryImage,
  getAlbum,
  listAlbums,
  removeAlbum,
  removeGalleryImage,
  submitAlbum,
  submitGalleryImage,
} from '../controllers/galleryController'

const router = Router()

// Public
router.get('/', listAlbums)
router.get('/:slug', getAlbum)

// Admin only
router.post('/', authMiddleware, submitAlbum)

router.put(
  '/:id',
  authMiddleware,
  editAlbum,
)

router.delete(
  '/:id',
  authMiddleware,
  removeAlbum,
)

router.post(
  '/:albumId/images',
  authMiddleware,
  submitGalleryImage,
)

router.put(
  '/:albumId/images/:imageId',
  authMiddleware,
  editGalleryImage,
)

router.delete(
  '/:albumId/images/:imageId',
  authMiddleware,
  removeGalleryImage,
)

export default router