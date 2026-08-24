import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Om Ganesh API',
  })
})

export default router