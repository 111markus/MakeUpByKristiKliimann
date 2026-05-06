export default function requireAdminSession(req, res, next) {
  if (req.session?.admin?.loggedIn) return next()
  return res.status(401).json({ error: 'Unauthorized' })
}
