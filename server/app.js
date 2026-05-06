/* global process */
import express from 'express'
import cors from 'cors'
import session from 'express-session'
import apiRoutes from './routes/api.js'
import adminServicesRoutes from './routes/adminServices.js'
import authRoutes from './routes/auth.js'

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
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
  })
)

app.use(express.json())

app.set('trust proxy', 1)

app.use(
  session({
    name: 'kk_admin',
    secret: process.env.SESSION_SECRET || 'devsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  })
)

app.get('/healthz', (req, res) => {
  res.json({ ok: true })
})

app.use('/api', apiRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminServicesRoutes)

const port = Number(process.env.PORT || 4010)
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on :${port}`)
})
