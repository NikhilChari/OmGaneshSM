import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware'

import {
  getAlbum,
  listAlbums,
  submitAlbum,
  submitGalleryImage,
} from '../controllers/galleryController'

const router = Router()

router.get('/', listAlbums)

router.get('/:slug', getAlbum)

router.post('/', authMiddleware, submitAlbum)

router.post(
  '/:albumId/images',
  authMiddleware,
  submitGalleryImage,
)

export default router