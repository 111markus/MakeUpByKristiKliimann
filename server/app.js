import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/api.js'
import adminServicesRoutes from './routes/adminServices.js'

const app = express()

const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://kristikliimannbeauty.onrender.com'
]

const allowedOrigins = (process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
  : defaultAllowedOrigins
)

app.use(
  cors({
    origin(origin, cb) {
      // same-origin / server-to-server calls
      if (!origin) return cb(null, true)
      if (allowedOrigins.includes(origin)) return cb(null, true)
      return cb(new Error('Not allowed by CORS'))
    },
    credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  })
)

app.use(express.json())

app.get('/healthz', (req, res) => {
  res.json({ ok: true })
})

app.use('/api', apiRoutes)
app.use('/api/admin', adminServicesRoutes)

const port = Number(process.env.PORT || 4010)
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on :${port}`)
})
