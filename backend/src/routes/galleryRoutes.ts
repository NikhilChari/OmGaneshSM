import { Router } from 'express'

import { authMiddleware } from '../middleware/authMiddleware'
import { galleryUpload } from '../middleware/uploadMiddleware'

import {
  editAlbum,
  editGalleryImage,
  getAlbum,
  listAdminAlbums,
  listAlbums,
  removeAlbum,
  removeGalleryImage,
  submitAlbum,
  submitGalleryImage,
} from '../controllers/galleryController'

const router = Router()

/*
 * Public
 */
router.get('/', listAlbums)

/*
 * Admin
 *
 * This must come before /:slug.
 * Otherwise "admin" would be treated
 * as a gallery slug.
 */
router.get(
  '/admin/albums',
  authMiddleware,
  listAdminAlbums,
)

/*
 * Public album detail
 */
router.get('/:slug', getAlbum)

/*
 * Admin album management
 */
router.post(
  '/',
  authMiddleware,
  submitAlbum,
)

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

/*
 * Admin image management
 */
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