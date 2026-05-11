import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FadeInView from '../components/FadeInView'
import {
  adminCreateCategory,
  adminCreateService,
  adminDeleteCategory,
  adminDeleteService,
  adminGetCategories,
  adminGetCategoryDetails,
  adminUpdateCategoryNote,
  adminUpdateService,
  authLogin,
  authLogout,
  authMe,
  getServices
} from '../lib/api'

const defaultCategories = ['Jumestus', 'Soengud']

function cloneGrouped(grouped) {
  return JSON.parse(JSON.stringify(grouped || {}))
}

function orderedRows(grouped) {
  const rows = []
  for (const [category, services] of Object.entries(grouped || {})) {
    services.forEach((service, index) => rows.push({ ...service, category, sort_order: index + 1 }))
  }
  return rows
}

function groupRows(rows, categories) {
  const next = {}
  categories.forEach((category) => {
    next[category] = []
  })
  rows.forEach((service) => {
    if (!next[service.category]) next[service.category] = []
    next[service.category].push(service)
  })
  return next
}

function isTempId(id) {
  return String(id).startsWith('temp-')
}

function autoScrollDuringDrag(e) {
  const edgeSize = 120
  const speed = 18
  if (e.clientY < edgeSize) window.scrollBy({ top: -speed, behavior: 'auto' })
  if (window.innerHeight - e.clientY < edgeSize) window.scrollBy({ top: speed, behavior: 'auto' })
}

export default function Admin({ setAdminNavActions }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [grouped, setGrouped] = useState(null)
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [categories, setCategories] = useState(defaultCategories)
  const [categoryNotes, setCategoryNotes] = useState({})
  const [newCategory, setNewCategory] = useState('')
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverId, setDragOverId] = useState(null)
  const [login, setLogin] = useState({ username: '', password: '' })
  const [form, setForm] = useState({ category: 'Jumestus', name: '', description: '', duration_minutes: '', price: '' })

  const baseGroupedRef = useRef(null)
  const baseCategoryNotesRef = useRef({})
  const deletedIdsRef = useRef(new Set())
  const tempIdRef = useRef(0)

  const rows = useMemo(() => orderedRows(grouped), [grouped])

  const notify = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const refreshSession = async () => {
    const s = await authMe()
    setSession(s)
    return s
  }

  const refresh = async () => {
    const [services, categoryDetails] = await Promise.all([getServices(), adminGetCategoryDetails()])
    const categoryList = categoryDetails.map((category) => category.name)
    const notes = Object.fromEntries(categoryDetails.map((category) => [category.name, category.note || '']))
    setGrouped(services)
    baseGroupedRef.current = cloneGrouped(services)
    baseCategoryNotesRef.current = { ...notes }
    deletedIdsRef.current.clear()
    setCategories(categoryList.length ? categoryList : defaultCategories)
    setCategoryNotes(notes)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const s = await refreshSession()
        if (s.loggedIn) await refresh()
      } catch (err) {
        setError(err)
      }
    })()
  }, [])

  useEffect(() => {
    if (session?.loggedIn && location.pathname === '/admin') {
      navigate('/admin/hinnakiri', { replace: true })
    }
  }, [location.pathname, navigate, session?.loggedIn])

  const onLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await authLogin({ username: login.username, password: login.password })
      const s = await refreshSession()
      if (s.loggedIn) await refresh()
      notify('Sisse logitud')
      if (location.pathname === '/admin') {
        navigate('/admin/hinnakiri', { replace: true })
      }
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  const onLogout = useCallback(async () => {
    setError(null)
    setBusy(true)
    try {
      await authLogout()
      await refreshSession()
      setGrouped(null)
      notify('Välja logitud')
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }, [])

  const saveDraft = useCallback(async () => {
    if (!grouped) return

    setError(null)
    setBusy(true)
    try {
      const baseRows = orderedRows(baseGroupedRef.current)
      const baseById = new Map(baseRows.map((service) => [String(service.id), service]))
      const currentRows = orderedRows(grouped)

      for (const id of deletedIdsRef.current) {
        await adminDeleteService(id)
      }

      for (const service of currentRows) {
        const payload = {
          category: service.category,
          name: service.name,
          description: service.description || '',
          duration_minutes: service.duration_minutes === '' || service.duration_minutes === undefined ? null : service.duration_minutes,
          price: Number(service.price),
          sort_order: service.sort_order
        }

        if (isTempId(service.id)) {
          await adminCreateService(payload)
          continue
        }

        const base = baseById.get(String(service.id))
        if (!base) continue

        const changed = (
          base.category !== payload.category ||
          base.name !== payload.name ||
          (base.description || '') !== payload.description ||
          (base.duration_minutes ?? null) !== (payload.duration_minutes ?? null) ||
          Number(base.price) !== Number(payload.price) ||
          Number(base.sort_order) !== Number(payload.sort_order)
        )

        if (changed) await adminUpdateService(service.id, payload)
      }

      for (const category of categories) {
        const nextNote = categoryNotes[category] || ''
        await adminUpdateCategoryNote(category, nextNote)
      }

      await refresh()
      notify('Teenused salvestatud')
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }, [categories, categoryNotes, grouped])

  useEffect(() => {
    if (!setAdminNavActions) return undefined

    if (session?.loggedIn) {
      setAdminNavActions({ busy, onSave: saveDraft, onLogout, username: session.username })
    } else if (session?.loggedIn === false) {
      setAdminNavActions(null)
    }

  }, [busy, onLogout, saveDraft, session?.loggedIn, session?.username, setAdminNavActions])

  const onCreate = (e) => {
    e.preventDefault()
    setError(null)
    const service = {
      id: `temp-${++tempIdRef.current}`,
      category: form.category,
      name: form.name,
      description: form.description,
      duration_minutes: form.duration_minutes === '' ? null : Number(form.duration_minutes),
      price: Number(form.price),
      sort_order: (grouped?.[form.category]?.length || 0) + 1
    }

    setGrouped((current) => {
      const next = cloneGrouped(current)
      if (!next[service.category]) next[service.category] = []
      next[service.category].push(service)
      return next
    })
    setForm((f) => ({ ...f, name: '', description: '', duration_minutes: '', price: '' }))
    notify('Teenus lisatud mustandisse')
  }

  const updateDraft = (id, patch) => {
    setError(null)
    setGrouped((current) => {
      const nextRows = orderedRows(current).map((service) => (
        String(service.id) === String(id) ? { ...service, ...patch } : service
      ))
      return groupRows(nextRows, categories)
    })
  }

  const onDelete = (id) => {
    if (!window.confirm('Kas oled kindel, et soovid selle teenuse kustutada?')) return

    setError(null)
    if (!isTempId(id)) deletedIdsRef.current.add(id)
    setGrouped((current) => groupRows(
      orderedRows(current).filter((service) => String(service.id) !== String(id)),
      categories
    ))
    notify('Teenus eemaldatud mustandist')
  }

  const onCreateCategory = async (e) => {
    e.preventDefault()
    const value = newCategory.trim()
    if (!value) return

    setError(null)
    setBusy(true)
    try {
      const categoryList = await adminCreateCategory(value)
      setCategories(categoryList)
      setCategoryNotes((current) => ({ ...current, [value]: '' }))
      setGrouped((current) => ({ ...cloneGrouped(current), [value]: [] }))
      setForm((f) => ({ ...f, category: value }))
      setNewCategory('')
      notify('Kategooria lisatud')
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  const onDeleteCategory = async (category) => {
    if (!window.confirm(`Kas oled kindel, et soovid kategooria "${category}" kustutada?`)) return

    setError(null)
    setBusy(true)
    try {
      await adminDeleteCategory(category)
      const categoryList = await adminGetCategories()
      setCategories(categoryList.length ? categoryList : defaultCategories)
      setCategoryNotes((current) => {
        const next = { ...current }
        delete next[category]
        return next
      })
      setGrouped((current) => {
        const next = cloneGrouped(current)
        delete next[category]
        return next
      })
      setForm((f) => ({ ...f, category: f.category === category ? (categoryList[0] || defaultCategories[0]) : f.category }))
      notify('Kategooria kustutatud')
    } catch (err) {
      setError(String(err.message || err).includes('409')
        ? new Error('Kategooriat saab kustutada siis, kui selles ei ole teenuseid.')
        : err)
    } finally {
      setBusy(false)
    }
  }

  const onDragStart = (e, service) => {
    setDraggingId(service.id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: service.id, category: service.category }))
  }

  const onDragEnd = () => {
    setDraggingId(null)
    setDragOverId(null)
  }

  const moveDraftService = (dragged, targetCategory, targetId = null) => {
    const sourceRows = rows.filter((service) => service.category === dragged.category)
    const targetRows = dragged.category === targetCategory
      ? sourceRows
      : rows.filter((service) => service.category === targetCategory)
    const fromIndex = sourceRows.findIndex((service) => String(service.id) === String(dragged.id))
    if (fromIndex < 0) return

    const [moved] = sourceRows.splice(fromIndex, 1)
    const nextTargetRows = dragged.category === targetCategory ? sourceRows : [...targetRows]
    const toIndex = targetId ? nextTargetRows.findIndex((service) => String(service.id) === String(targetId)) : nextTargetRows.length
    nextTargetRows.splice(toIndex < 0 ? nextTargetRows.length : toIndex, 0, { ...moved, category: targetCategory })

    const affectedCategories = new Set([dragged.category, targetCategory])
    const unaffectedRows = rows.filter((service) => !affectedCategories.has(service.category))
    const affectedRows = dragged.category === targetCategory ? nextTargetRows : [...sourceRows, ...nextTargetRows]
    setGrouped(groupRows([...unaffectedRows, ...affectedRows], categories))
    notify('Järjekord muudetud mustandis')
    onDragEnd()
  }

  const onDropService = (e, targetService) => {
    e.preventDefault()
    e.stopPropagation()
    let dragged
    try {
      dragged = JSON.parse(e.dataTransfer.getData('text/plain'))
    } catch {
      return
    }
    if (!dragged?.id || String(dragged.id) === String(targetService.id)) return
    moveDraftService(dragged, targetService.category, targetService.id)
  }

  const onDropCategory = (e, targetCategory) => {
    e.preventDefault()
    let dragged
    try {
      dragged = JSON.parse(e.dataTransfer.getData('text/plain'))
    } catch {
      return
    }
    if (!dragged?.id) return
    moveDraftService(dragged, targetCategory)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    autoScrollDuringDrag(e)
  }

  return (
    <section className="pt-28 sm:pt-32 lg:pt-36 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <FadeInView>
          <div className="admin-panel bg-ivory p-5 sm:p-8 lg:p-10">
            <h1 className="font-serif text-3xl font-medium text-dark mb-6">Admin</h1>
            {error && <p className="text-sm text-rose font-light mb-6">{String(error.message || error)}</p>}
            {!session && <p className="text-sm text-warm-gray font-light">Laen...</p>}

            {session && !session.loggedIn && (
              <div className="mb-10">
                <form onSubmit={onLogin} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={login.username} onChange={(e) => setLogin((v) => ({ ...v, username: e.target.value }))} placeholder="Kasutajanimi" autoComplete="username" required />
                  <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={login.password} onChange={(e) => setLogin((v) => ({ ...v, password: e.target.value }))} placeholder="Salasõna" type="password" autoComplete="current-password" required />
                  <div className="md:col-span-2 mt-3">
                    <button disabled={busy} className="px-6 py-3 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500 disabled:opacity-60" type="submit">
                      Logi sisse
                    </button>
                  </div>
                </form>
              </div>
            )}

            {session && session.loggedIn && (
              <>
                <div className="mb-10">
                  <h2 className="font-serif text-xl font-medium text-dark mb-4">Lisa teenus</h2>
                  <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <select className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                      {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                    <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Nimi" required />
                    <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="Hind (nt 55)" required />
                    <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={form.duration_minutes} onChange={(e) => setForm((f) => ({ ...f, duration_minutes: e.target.value }))} placeholder="Ajakulu (min)" />
                    <textarea className="md:col-span-4 border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Kirjeldus" rows={3} />
                    <div className="md:col-span-4 mt-3">
                      <button disabled={busy} className="px-6 py-3 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500 disabled:opacity-60" type="submit">
                        Lisa
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mb-10">
                  <h2 className="font-serif text-xl font-medium text-dark mb-4">Kategooriad</h2>
                  <form onSubmit={onCreateCategory} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 mb-4">
                    <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Uus kategooria" />
                    <button disabled={busy} className="px-6 py-3 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500 disabled:opacity-60" type="submit">Lisa</button>
                  </form>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => {
                      const serviceCount = grouped?.[category]?.length || 0
                      return (
                        <div key={category} className="flex items-center gap-2 border border-warm-gray/30 bg-cream px-3 py-2">
                          <span className="text-sm text-dark">{category}</span>
                          <button type="button" disabled={busy || serviceCount > 0} onClick={() => onDeleteCategory(category)} className="text-xs tracking-[0.15em] uppercase text-red-700 hover:text-red-900 disabled:text-warm-gray/50" title={serviceCount > 0 ? 'Kustuta teenused enne kategooria kustutamist' : 'Kustuta kategooria'}>Kustuta</button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-xl font-medium text-dark mb-4">Teenused</h2>
                  {!grouped && <p className="text-sm text-warm-gray font-light">Laen...</p>}
                  <div className="space-y-8">
                    {categories.map((category) => {
                      const services = grouped?.[category] || []
                      return (
                        <div key={category} className={`space-y-3 border border-transparent p-2 transition-all duration-200 ${draggingId && services.length === 0 ? 'border-rose/40 bg-white/60' : ''}`} onDragOver={onDragOver} onDrop={(e) => onDropCategory(e, category)}>
                          <h3 className="font-serif text-lg font-medium text-dark">{category}</h3>
                          {services.length === 0 && <div className="border border-dashed border-warm-gray/30 bg-white/60 px-4 py-5 text-sm text-warm-gray font-light">Lohista teenus siia</div>}
                          {services.map((s) => (
                            <div key={s.id} className={`border bg-cream p-4 transition-all duration-200 ${draggingId === s.id ? 'border-rose opacity-50 scale-[0.99]' : dragOverId === s.id ? 'border-rose bg-white shadow-sm translate-y-1' : 'border-warm-gray/30'}`} onDragOver={onDragOver} onDragEnter={() => setDragOverId(s.id)} onDragLeave={() => setDragOverId((id) => (id === s.id ? null : id))} onDrop={(e) => onDropService(e, s)}>
                              <div className="flex items-start gap-3">
                                <button type="button" draggable={!busy} disabled={busy} onDragStart={(e) => onDragStart(e, s)} onDragEnd={onDragEnd} className={`h-10 w-10 shrink-0 border bg-white text-warm-gray text-sm leading-none cursor-grab shadow-sm transition-all duration-200 active:cursor-grabbing disabled:opacity-60 ${draggingId === s.id ? 'border-rose text-rose shadow-md' : 'border-warm-gray/30'}`} aria-label="Muuda teenuse asukohta" title="Lohista teenuse asukoha muutmiseks">::</button>
                                <div className="grid flex-1 grid-cols-1 md:grid-cols-5 gap-2 items-center">
                                  <select className="border border-warm-gray/30 bg-ivory px-3 py-2 text-sm" value={s.category} onChange={(e) => updateDraft(s.id, { category: e.target.value })}>
                                    {categories.map((option) => <option key={option} value={option}>{option}</option>)}
                                  </select>
                                  <input className="border border-warm-gray/30 bg-ivory px-3 py-2 text-sm" value={s.name} onChange={(e) => updateDraft(s.id, { name: e.target.value })} />
                                  <input className="border border-warm-gray/30 bg-ivory px-3 py-2 text-sm" value={String(s.price)} onChange={(e) => updateDraft(s.id, { price: e.target.value })} />
                                  <input className="border border-warm-gray/30 bg-ivory px-3 py-2 text-sm" value={s.duration_minutes === null || s.duration_minutes === undefined ? '' : String(s.duration_minutes)} placeholder="min" onChange={(e) => updateDraft(s.id, { duration_minutes: e.target.value === '' ? null : Number(e.target.value) })} />
                                  <div className="flex gap-2 justify-end">
                                    <button disabled={busy} className="px-4 py-2 border border-red-700 text-red-700 text-xs tracking-[0.15em] uppercase hover:bg-red-700 hover:text-cream transition disabled:opacity-60" onClick={() => onDelete(s.id)}>Kustuta</button>
                                  </div>
                                  <textarea className="md:col-span-5 border border-warm-gray/30 bg-ivory px-3 py-2 text-sm" value={s.description || ''} onChange={(e) => updateDraft(s.id, { description: e.target.value })} rows={3} />
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="pt-2">
                            <textarea
                              className="w-full border border-warm-gray/30 bg-ivory px-3 py-2 text-xs text-warm-gray font-light"
                              value={categoryNotes[category] || ''}
                              onChange={(e) => setCategoryNotes((current) => ({ ...current, [category]: e.target.value }))}
                              placeholder="Kategooria märkus (kuvatakse hinnakirjas * märgina)"
                              rows={2}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </FadeInView>
      </div>
      {notice && <div className="fixed bottom-4 left-4 right-4 z-[60] border border-rose/30 bg-white px-5 py-4 text-sm text-dark shadow-lg sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-xs">{notice}</div>}
    </section>
  )
}
