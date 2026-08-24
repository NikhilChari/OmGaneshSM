import { Router } from 'express'

import {
  getAlbum,
  listAlbums,
  submitAlbum,
  submitGalleryImage,
} from '../controllers/galleryController'

const router = Router()

router.get('/', listAlbums)

router.get('/:slug', getAlbum)

router.post('/', submitAlbum)

router.post('/:albumId/images', submitGalleryImage)

export default router