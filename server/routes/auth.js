/* global process */
import { Router } from 'express'
import bcrypt from 'bcryptjs'

const router = Router()

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {}

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin'
  const expectedPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!expectedPasswordHash) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD_HASH is not configured' })
  }

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' })
  }

  if (String(username) !== expectedUsername) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const ok = await bcrypt.compare(String(password), expectedPasswordHash)
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  req.session.admin = { loggedIn: true, username: expectedUsername }
  res.json({ ok: true })
})

router.post('/logout', (req, res) => {
  req.session.admin = null
  res.status(204).end()
})

router.get('/me', (req, res) => {
  res.json({
    loggedIn: Boolean(req.session?.admin?.loggedIn),
    username: req.session?.admin?.username || null
  })
})

export default router
