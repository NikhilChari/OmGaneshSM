import { Router } from 'express'

import {
  getNews,
  listNews,
  submitNews,
} from '../controllers/newsController'

const router = Router()

router.get('/', listNews)

router.get('/:slug', getNews)

router.post('/', submitNews)

export default router