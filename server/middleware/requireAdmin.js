/* global process, Buffer */
import crypto from 'node:crypto'

function timingSafeEqual(a, b) {
  const aBuf = Buffer.from(String(a))
  const bBuf = Buffer.from(String(b))
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

/**
 * Very small admin auth middleware.
 *
 * Contract:
 * - Requires header: Authorization: Bearer <ADMIN_TOKEN>
 * - Compares token against process.env.ADMIN_TOKEN
 */
export default function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) {
    return res.status(500).json({ error: 'ADMIN_TOKEN is not configured' })
  }

  const header = req.headers.authorization || ''
  const match = header.match(/^Bearer\s+(.+)$/i)
  const provided = match?.[1]

  if (!provided || !timingSafeEqual(provided, expected)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  next()
}
