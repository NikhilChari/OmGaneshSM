import { Router } from 'express'
import { submitMembership } from '../controllers/membershipController'

const router = Router()

router.post('/', submitMembership)

export default router