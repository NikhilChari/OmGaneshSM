import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { galleryUpload } from '../middleware/uploadMiddleware'

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
  galleryUpload.single('image'),
  submitGalleryImage,
)

router.put(
  '/:albumId/images/:imageId',
  authMiddleware,
  galleryUpload.single('image'),
  editGalleryImage,
)

router.delete(
  '/:albumId/images/:imageId',
  authMiddleware,
  removeGalleryImage,
)

export default router