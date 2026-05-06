import { Router } from 'express'
import requireAdminSession from '../middleware/requireAdminSession.js'
import {
  createCategory,
  createHomeService,
  createService,
  deleteCategory,
  deleteHomeService,
  deleteService,
  listCategoryDetails,
  listHomeServices,
  listCategories,
  reorderServices,
  updateCategoryNote,
  updateHomeService,
  updateService
} from '../db/services.js'

const router = Router()

router.use(requireAdminSession)

router.get('/categories', (req, res) => {
  res.json(listCategories())
})

router.get('/category-details', (req, res) => {
  res.json(listCategoryDetails())
})

router.post('/categories', (req, res) => {
  const created = createCategory(req.body?.name)
  if (!created) return res.status(400).json({ error: 'name is required' })
  res.status(201).json(listCategories())
})

router.delete('/categories/:name', (req, res) => {
  const result = deleteCategory(req.params.name)
  if (result.reason === 'not_empty') {
    return res.status(409).json({ error: 'category is not empty' })
  }
  if (!result.ok) return res.status(404).json({ error: 'category not found' })
  res.status(204).end()
})

router.patch('/categories/:name/note', (req, res) => {
  const updated = updateCategoryNote(req.params.name, req.body?.note)
  if (!updated) return res.status(400).json({ error: 'category name is required' })
  res.json(updated)
})

router.get('/home-services', (req, res) => {
  res.json(listHomeServices())
})

router.post('/home-services', (req, res) => {
  const { icon, title, duration_minutes, price, sort_order } = req.body || {}
  if (!icon || !title || price === undefined || price === null) {
    return res.status(400).json({ error: 'icon, title and price are required' })
  }
  const parsedDuration = duration_minutes === undefined || duration_minutes === null || duration_minutes === '' ? null : Number(duration_minutes)
  if (parsedDuration !== null && (!Number.isInteger(parsedDuration) || parsedDuration < 0)) {
    return res.status(400).json({ error: 'duration_minutes must be a non-negative integer' })
  }
  const parsedPrice = Number(price)
  if (!Number.isFinite(parsedPrice)) return res.status(400).json({ error: 'price must be a number' })

  res.status(201).json(createHomeService({
    icon: String(icon),
    title: String(title).trim(),
    duration_minutes: parsedDuration,
    price: parsedPrice,
    sort_order: sort_order === undefined ? undefined : Number(sort_order)
  }))
})

router.patch('/home-services/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' })
  const patch = { ...req.body }
  if (patch.duration_minutes !== undefined) {
    patch.duration_minutes = patch.duration_minutes === null || patch.duration_minutes === '' ? null : Number(patch.duration_minutes)
    if (patch.duration_minutes !== null && (!Number.isInteger(patch.duration_minutes) || patch.duration_minutes < 0)) {
      return res.status(400).json({ error: 'duration_minutes must be a non-negative integer' })
    }
  }
  if (patch.price !== undefined) {
    patch.price = Number(patch.price)
    if (!Number.isFinite(patch.price)) return res.status(400).json({ error: 'price must be a number' })
  }
  if (patch.sort_order !== undefined) patch.sort_order = Number(patch.sort_order)
  const updated = updateHomeService(id, patch)
  if (!updated) return res.status(404).json({ error: 'not found' })
  res.json(updated)
})

router.delete('/home-services/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' })
  if (!deleteHomeService(id)) return res.status(404).json({ error: 'not found' })
  res.status(204).end()
})

router.post('/services', (req, res) => {
  const { category, name, description, duration_minutes, price, sort_order } = req.body || {}
  if (!category || !name || price === undefined || price === null) {
    return res.status(400).json({ error: 'category, name and price are required' })
  }

  let parsedDuration = null
  if (duration_minutes !== undefined && duration_minutes !== null && duration_minutes !== '') {
    parsedDuration = Number(duration_minutes)
    if (!Number.isInteger(parsedDuration) || parsedDuration < 0) {
      return res.status(400).json({ error: 'duration_minutes must be a non-negative integer' })
    }
  }

  const parsedPrice = Number(price)
  if (!Number.isFinite(parsedPrice)) {
    return res.status(400).json({ error: 'price must be a number' })
  }

  const created = createService({
    category: String(category).trim(),
    name: String(name).trim(),
    description: description === undefined || description === null ? '' : String(description),
    duration_minutes: parsedDuration,
    price: parsedPrice,
    sort_order: sort_order === undefined ? undefined : Number(sort_order)
  })

  res.status(201).json(created)
})

router.patch('/services/reorder', (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : null
  if (!items) return res.status(400).json({ error: 'items are required' })

  const parsed = items.map((item) => ({
    id: Number(item.id),
    sort_order: Number(item.sort_order),
    category: item.category === undefined ? undefined : String(item.category).trim()
  }))

  if (parsed.some((item) => !Number.isInteger(item.id) || !Number.isInteger(item.sort_order) || item.category === '')) {
    return res.status(400).json({ error: 'items must contain integer id, integer sort_order and optional category' })
  }

  res.json(reorderServices(parsed))
})

router.patch('/services/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' })

  const patch = { ...req.body }
  if (patch.price !== undefined) {
    const parsedPrice = Number(patch.price)
    if (!Number.isFinite(parsedPrice)) return res.status(400).json({ error: 'price must be a number' })
    patch.price = parsedPrice
  }
  if (patch.description !== undefined && patch.description !== null) {
    patch.description = String(patch.description)
  }
  if (patch.duration_minutes !== undefined) {
    if (patch.duration_minutes === null || patch.duration_minutes === '') {
      patch.duration_minutes = null
    } else {
      const parsed = Number(patch.duration_minutes)
      if (!Number.isInteger(parsed) || parsed < 0) {
        return res.status(400).json({ error: 'duration_minutes must be a non-negative integer' })
      }
      patch.duration_minutes = parsed
    }
  }
  if (patch.sort_order !== undefined) {
    const parsed = Number(patch.sort_order)
    if (!Number.isFinite(parsed)) return res.status(400).json({ error: 'sort_order must be a number' })
    patch.sort_order = parsed
  }

  const updated = updateService(id, patch)
  if (!updated) return res.status(404).json({ error: 'not found' })
  res.json(updated)
})

router.delete('/services/:id', (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' })

  const ok = deleteService(id)
  if (!ok) return res.status(404).json({ error: 'not found' })
  res.status(204).end()
})

export default router
