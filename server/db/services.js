import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const DEFAULT_DB_PATH = path.join(process.cwd(), 'server', 'db', 'database.db')

const SEED_SERVICES = [
  { category: 'Jumestus', name: 'Pruudimeik', price: 75, sort_order: 1 },
  { category: 'Jumestus', name: 'Fantaasiameik', price: 60, sort_order: 2 },
  { category: 'Jumestus', name: 'Pruudi proovimeik', price: 55, sort_order: 3 },
  { category: 'Jumestus', name: 'Pidulik jumestus', price: 55, sort_order: 4 },
  { category: 'Jumestus', name: 'Fotomeik', price: 50, sort_order: 5 },

  { category: 'Soengud', name: 'Pruudisoeng', price: 55, sort_order: 1 },
  { category: 'Soengud', name: 'Pruudi proovisoeng', price: 45, sort_order: 2 },
  { category: 'Soengud', name: 'Soengud', price: 40, sort_order: 3 }
]

let db

export function getDbPath() {
  return process.env.DB_PATH || DEFAULT_DB_PATH
}

export function getDb() {
  if (db) return db

  const dbPath = getDbPath()
  const dir = path.dirname(dbPath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  db = new Database(dbPath)
  db.pragma('journal_mode = WAL')

  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_services_category_sort
      ON services (category, sort_order, id);
  `)

  seedIfEmpty(db)
  return db
}

function seedIfEmpty(dbInstance) {
  const row = dbInstance.prepare('SELECT COUNT(1) AS count FROM services').get()
  if (row?.count > 0) return

  const insert = dbInstance.prepare(
    'INSERT INTO services (category, name, price, sort_order) VALUES (@category, @name, @price, @sort_order)'
  )

  const tx = dbInstance.transaction((items) => {
    for (const item of items) insert.run(item)
  })

  tx(SEED_SERVICES)
}

export function listServicesGrouped() {
  const rows = getDb()
    .prepare(
      `SELECT id, category, name, price, sort_order
       FROM services
       ORDER BY category ASC, sort_order ASC, id ASC`
    )
    .all()

  /** @type {Record<string, Array<{id:number,category:string,name:string,price:number,sort_order:number}>>} */
  const grouped = {}
  for (const row of rows) {
    if (!grouped[row.category]) grouped[row.category] = []
    grouped[row.category].push(row)
  }

  return grouped
}

export function createService({ category, name, price, sort_order }) {
  const stmt = getDb().prepare(
    `INSERT INTO services (category, name, price, sort_order)
     VALUES (@category, @name, @price, COALESCE(@sort_order, 0))`
  )

  const info = stmt.run({ category, name, price, sort_order })
  return getDb().prepare('SELECT id, category, name, price, sort_order FROM services WHERE id = ?').get(info.lastInsertRowid)
}

export function updateService(id, patch) {
  const fields = []
  const params = { id }

  for (const key of ['category', 'name', 'price', 'sort_order']) {
    if (patch[key] !== undefined) {
      fields.push(`${key} = @${key}`)
      params[key] = patch[key]
    }
  }

  if (fields.length === 0) {
    return getDb().prepare('SELECT id, category, name, price, sort_order FROM services WHERE id = ?').get(id)
  }

  getDb().prepare(`UPDATE services SET ${fields.join(', ')} WHERE id = @id`).run(params)
  return getDb().prepare('SELECT id, category, name, price, sort_order FROM services WHERE id = ?').get(id)
}

export function deleteService(id) {
  const info = getDb().prepare('DELETE FROM services WHERE id = ?').run(id)
  return info.changes > 0
}
