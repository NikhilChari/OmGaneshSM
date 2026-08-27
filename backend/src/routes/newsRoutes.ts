import { Router } from 'express'

import { authMiddleware } from '../middleware/authMiddleware'

import {
  editNews,
  getNews,
  listAdminNews,
  listNews,
  removeNews,
  submitNews,
} from '../controllers/newsController'

const router = Router()

/*
 * Public News
 */
router.get(
  '/',
  listNews,
)

/*
 * Admin News
 *
 * Must come before /:slug.
 */
router.get(
  '/admin',
  authMiddleware,
  listAdminNews,
)

/*
 * Admin create
 */
router.post(
  '/',
  authMiddleware,
  submitNews,
)

/*
 * Admin update
 */
router.put(
  '/:id',
  authMiddleware,
  editNews,
)

/*
 * Admin delete
 */
router.delete(
  '/:id',
  authMiddleware,
  removeNews,
)

/*
 * Public News detail
 *
 * Keep this after /admin so "admin"
 * is not interpreted as a slug.
 */
router.get(
  '/:slug',
  getNews,
)

export default router