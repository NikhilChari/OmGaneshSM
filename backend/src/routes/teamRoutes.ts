import { Router } from 'express'

import { authMiddleware } from '../middleware/authMiddleware'
import { teamUpload } from '../middleware/uploadMiddleware'

import {
  editTeamMember,
  listAdminTeamMembers,
  listTeamMembers,
  removeTeamMember,
  submitTeamMember,
} from '../controllers/teamController'

const router = Router()

/*
 * Public team
 */
router.get(
  '/',
  listTeamMembers,
)

/*
 * Admin team listing
 */
router.get(
  '/admin',
  authMiddleware,
  listAdminTeamMembers,
)

/*
 * Admin create
 */
router.post(
  '/',
  authMiddleware,
  teamUpload.single('image'),
  submitTeamMember,
)

/*
 * Admin update / optional image replacement
 */
router.put(
  '/:id',
  authMiddleware,
  teamUpload.single('image'),
  editTeamMember,
)

/*
 * Admin delete
 */
router.delete(
  '/:id',
  authMiddleware,
  removeTeamMember,
)

export default router