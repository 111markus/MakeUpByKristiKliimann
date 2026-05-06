/* global process */
import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const DEFAULT_DB_PATH = path.join(process.cwd(), 'server', 'db', 'database.db')

const SEED_SERVICES = [
  { category: 'Jumestus', name: 'Pruudimeik', description: '', duration_minutes: null, price: 75, sort_order: 1 },
  { category: 'Jumestus', name: 'Fantaasiameik', description: '', duration_minutes: null, price: 60, sort_order: 2 },
  { category: 'Jumestus', name: 'Pruudi proovimeik', description: '', duration_minutes: null, price: 55, sort_order: 3 },
  { category: 'Jumestus', name: 'Pidulik jumestus', description: '', duration_minutes: null, price: 55, sort_order: 4 },
  { category: 'Jumestus', name: 'Fotomeik', description: '', duration_minutes: null, price: 50, sort_order: 5 },

  { category: 'Soengud', name: 'Pruudisoeng', description: '', duration_minutes: null, price: 55, sort_order: 1 },
  { category: 'Soengud', name: 'Pruudi proovisoeng', description: '', duration_minutes: null, price: 45, sort_order: 2 },
  { category: 'Soengud', name: 'Soengud', description: '', duration_minutes: null, price: 40, sort_order: 3 }
]

const SEED_CATEGORIES = ['Jumestus', 'Soengud']
const SEED_CATEGORY_NOTES = {
  Jumestus: 'Teenuse lõplik hind võib varieeruda vastavalt töömahule. Lisad (sh kunstripsmed) ei kuulu hinna sisse.',
  Soengud: 'Teenuse lõplik hind võib varieeruda vastavalt töömahule, juuste paksusele ja pikkusele.'
}

const SEED_HOME_SERVICES = [
  { icon: 'Crown', title: 'Pruudimeik', duration_minutes: 90, price: 75, sort_order: 1 },
  { icon: 'Sparkles', title: 'Fantaasiameik', duration_minutes: 90, price: 60, sort_order: 2 },
  { icon: 'Heart', title: 'Pruudi proovimeik', duration_minutes: 90, price: 55, sort_order: 3 },
  { icon: 'Star', title: 'Pidulik jumestus', duration_minutes: 60, price: 55, sort_order: 4 },
  { icon: 'Wand2', title: 'Pruudisoeng', duration_minutes: 90, price: 55, sort_order: 5 },
  { icon: 'Camera', title: 'Fotomeik', duration_minutes: 60, price: 50, sort_order: 6 },
  { icon: 'Gift', title: 'Pruudi proovisoeng', duration_minutes: 90, price: 45, sort_order: 7 },
  { icon: 'Zap', title: 'Soengud', duration_minutes: 60, price: 40, sort_order: 8 }
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
    CREATE TABLE IF NOT EXISTS categories (
      name TEXT PRIMARY KEY,
      sort_order INTEGER NOT NULL DEFAULT 0,
      note TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  duration_minutes INTEGER,
      price REAL NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_services_category_sort
      ON services (category, sort_order, id);

    CREATE TABLE IF NOT EXISTS home_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      icon TEXT NOT NULL,
      title TEXT NOT NULL,
      duration_minutes INTEGER,
      price REAL NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
  `)

  seedIfEmpty(db)
  ensureCategoryNoteColumn(db)
  seedCategories(db)
  seedCategoryNotesOnce(db)
  seedHomeServices(db)
  return db
}

function ensureCategoryNoteColumn(dbInstance) {
  const columns = dbInstance.prepare('PRAGMA table_info(categories)').all()
  if (!columns.some((column) => column.name === 'note')) {
    dbInstance.exec("ALTER TABLE categories ADD COLUMN note TEXT NOT NULL DEFAULT ''")
  }
}

function seedIfEmpty(dbInstance) {
  const row = dbInstance.prepare('SELECT COUNT(1) AS count FROM services').get()
  if (row?.count > 0) return

  const insert = dbInstance.prepare(
  'INSERT INTO services (category, name, description, duration_minutes, price, sort_order) VALUES (@category, @name, @description, @duration_minutes, @price, @sort_order)'
  )

  const tx = dbInstance.transaction((items) => {
    for (const item of items) insert.run(item)
  })

  tx(SEED_SERVICES)
}

function seedCategories(dbInstance) {
  const insert = dbInstance.prepare('INSERT OR IGNORE INTO categories (name, sort_order, note) VALUES (?, ?, ?)')
  const existingServices = dbInstance.prepare('SELECT DISTINCT category FROM services ORDER BY category ASC').all()
  const tx = dbInstance.transaction(() => {
    SEED_CATEGORIES.forEach((category, index) => insert.run(category, index + 1, ''))
    existingServices.forEach((row, index) => insert.run(row.category, SEED_CATEGORIES.length + index + 1, ''))
  })

  tx()
}

function seedCategoryNotesOnce(dbInstance) {
  const seeded = dbInstance.prepare("SELECT value FROM app_meta WHERE key = 'category_notes_seeded'").get()
  if (seeded) return

  const update = dbInstance.prepare('UPDATE categories SET note = ? WHERE name = ? AND note = ?')
  const tx = dbInstance.transaction(() => {
    Object.entries(SEED_CATEGORY_NOTES).forEach(([category, note]) => update.run(note, category, ''))
    dbInstance.prepare("INSERT INTO app_meta (key, value) VALUES ('category_notes_seeded', '1')").run()
  })
  tx()
}

function seedHomeServices(dbInstance) {
  const row = dbInstance.prepare('SELECT COUNT(1) AS count FROM home_services').get()
  if (row?.count > 0) return

  const insert = dbInstance.prepare(
    'INSERT INTO home_services (icon, title, duration_minutes, price, sort_order) VALUES (@icon, @title, @duration_minutes, @price, @sort_order)'
  )
  const tx = dbInstance.transaction((items) => {
    for (const item of items) insert.run(item)
  })
  tx(SEED_HOME_SERVICES)
}

export function listCategories() {
  return getDb()
    .prepare('SELECT name FROM categories ORDER BY sort_order ASC, name ASC')
    .all()
    .map((row) => row.name)
}

export function listCategoryDetails() {
  return getDb()
    .prepare('SELECT name, note FROM categories ORDER BY sort_order ASC, name ASC')
    .all()
}

export function createCategory(name) {
  const value = String(name || '').trim()
  if (!value) return null

  const nextSortOrder = getDb()
    .prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM categories')
    .get().next

  getDb()
    .prepare('INSERT OR IGNORE INTO categories (name, sort_order, note) VALUES (?, ?, ?)')
    .run(value, nextSortOrder, '')

  return value
}

export function updateCategoryNote(name, note) {
  const value = String(name || '').trim()
  if (!value) return null
  createCategory(value)
  getDb()
    .prepare('UPDATE categories SET note = ? WHERE name = ?')
    .run(String(note || '').trim(), value)
  return getDb().prepare('SELECT name, note FROM categories WHERE name = ?').get(value)
}

export function deleteCategory(name) {
  const value = String(name || '').trim()
  if (!value) return { ok: false, reason: 'invalid' }

  const serviceCount = getDb()
    .prepare('SELECT COUNT(1) AS count FROM services WHERE category = ?')
    .get(value).count

  if (serviceCount > 0) return { ok: false, reason: 'not_empty' }

  const info = getDb().prepare('DELETE FROM categories WHERE name = ?').run(value)
  return { ok: info.changes > 0 }
}

export function listServicesGrouped() {
  const rows = getDb()
    .prepare(
  `SELECT id, category, name, description, duration_minutes, price, sort_order
       FROM services
       ORDER BY category ASC, sort_order ASC, id ASC`
    )
    .all()

  /** @type {Record<string, Array<{id:number,category:string,name:string,description:string,duration_minutes:number|null,price:number,sort_order:number}>>} */
  const grouped = {}
  for (const row of rows) {
    if (!grouped[row.category]) grouped[row.category] = []
    grouped[row.category].push(row)
  }

  return grouped
}

export function createService({ category, name, description, duration_minutes, price, sort_order }) {
  createCategory(category)

  const nextSortOrder = sort_order === undefined || sort_order === null
    ? getDb()
      .prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM services WHERE category = ?')
      .get(category).next
    : sort_order

  const stmt = getDb().prepare(
    `INSERT INTO services (category, name, description, duration_minutes, price, sort_order)
     VALUES (@category, @name, COALESCE(@description, ''), @duration_minutes, @price, COALESCE(@sort_order, 0))`
  )

  const info = stmt.run({ category, name, description, duration_minutes, price, sort_order: nextSortOrder })
  return getDb()
    .prepare('SELECT id, category, name, description, duration_minutes, price, sort_order FROM services WHERE id = ?')
    .get(info.lastInsertRowid)
}

export function updateService(id, patch) {
  const fields = []
  const params = { id }

  for (const key of ['category', 'name', 'description', 'duration_minutes', 'price', 'sort_order']) {
    if (patch[key] !== undefined) {
      if (key === 'category') createCategory(patch[key])
      fields.push(`${key} = @${key}`)
      params[key] = patch[key]
    }
  }

  if (fields.length === 0) {
    return getDb().prepare('SELECT id, category, name, description, duration_minutes, price, sort_order FROM services WHERE id = ?').get(id)
  }

  getDb().prepare(`UPDATE services SET ${fields.join(', ')} WHERE id = @id`).run(params)
  return getDb().prepare('SELECT id, category, name, description, duration_minutes, price, sort_order FROM services WHERE id = ?').get(id)
}

export function deleteService(id) {
  const info = getDb().prepare('DELETE FROM services WHERE id = ?').run(id)
  return info.changes > 0
}

export function reorderServices(items) {
  const updateOrder = getDb().prepare('UPDATE services SET sort_order = @sort_order WHERE id = @id')
  const updateCategoryAndOrder = getDb().prepare('UPDATE services SET category = @category, sort_order = @sort_order WHERE id = @id')
  const tx = getDb().transaction((rows) => {
    for (const row of rows) {
      if (row.category) {
        createCategory(row.category)
        updateCategoryAndOrder.run(row)
      } else {
        updateOrder.run(row)
      }
    }
  })

  tx(items)
  return listServicesGrouped()
}

export function listHomeServices() {
  return getDb()
    .prepare('SELECT id, icon, title, duration_minutes, price, sort_order FROM home_services ORDER BY sort_order ASC, id ASC')
    .all()
}

export function createHomeService({ icon, title, duration_minutes, price, sort_order }) {
  const nextSortOrder = sort_order === undefined || sort_order === null
    ? getDb().prepare('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM home_services').get().next
    : sort_order
  const info = getDb()
    .prepare('INSERT INTO home_services (icon, title, duration_minutes, price, sort_order) VALUES (@icon, @title, @duration_minutes, @price, @sort_order)')
    .run({ icon, title, duration_minutes, price, sort_order: nextSortOrder })
  return getDb().prepare('SELECT id, icon, title, duration_minutes, price, sort_order FROM home_services WHERE id = ?').get(info.lastInsertRowid)
}

export function updateHomeService(id, patch) {
  const fields = []
  const params = { id }
  for (const key of ['icon', 'title', 'duration_minutes', 'price', 'sort_order']) {
    if (patch[key] !== undefined) {
      fields.push(`${key} = @${key}`)
      params[key] = patch[key]
    }
  }
  if (fields.length) getDb().prepare(`UPDATE home_services SET ${fields.join(', ')} WHERE id = @id`).run(params)
  return getDb().prepare('SELECT id, icon, title, duration_minutes, price, sort_order FROM home_services WHERE id = ?').get(id)
}

export function deleteHomeService(id) {
  const info = getDb().prepare('DELETE FROM home_services WHERE id = ?').run(id)
  return info.changes > 0
}
