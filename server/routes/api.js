import { Router } from 'express'
import { listCategoryDetails, listHomeServices, listServicesGrouped } from '../db/services.js'

const router = Router()

router.get('/services', (req, res) => {
  res.json(listServicesGrouped())
})

router.get('/home-services', (req, res) => {
  res.json(listHomeServices())
})

router.get('/categories', (req, res) => {
  res.json(listCategoryDetails())
})

export default router
