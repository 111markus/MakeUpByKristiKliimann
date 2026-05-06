import { Router } from 'express'
import requireAdminSession from '../middleware/requireAdminSession.js'
import { createService, updateService, deleteService } from '../db/services.js'

const router = Router()

router.use(requireAdminSession)

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
    sort_order: sort_order === undefined ? 0 : Number(sort_order)
  })

  res.status(201).json(created)
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
