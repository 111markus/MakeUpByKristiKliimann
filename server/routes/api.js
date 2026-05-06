import { Router } from 'express'
import { listServicesGrouped } from '../db/services.js'

const router = Router()

router.get('/services', (req, res) => {
  res.json(listServicesGrouped())
})

export default router
