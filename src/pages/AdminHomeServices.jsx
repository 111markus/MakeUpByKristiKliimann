import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Camera, Crown, Gift, Heart, Sparkles, Star, Wand2, Zap } from 'lucide-react'
import FadeInView from '../components/FadeInView'
import {
  adminCreateHomeService,
  adminDeleteHomeService,
  adminUpdateHomeService,
  authLogin,
  authLogout,
  authMe,
  getHomeServices
} from '../lib/api'

const icons = ['Crown', 'Sparkles', 'Heart', 'Star', 'Wand2', 'Camera', 'Gift', 'Zap']
const iconMap = { Camera, Crown, Gift, Heart, Sparkles, Star, Wand2, Zap }

function IconPreview({ name }) {
  const Icon = iconMap[name] || Sparkles
  return <Icon size={20} />
}

function isTempId(id) {
  return String(id).startsWith('temp-')
}

function withSort(items) {
  return items.map((item, index) => ({ ...item, sort_order: index + 1 }))
}

function autoScrollDuringDrag(e) {
  const edgeSize = 120
  const speed = 18
  if (e.clientY < edgeSize) window.scrollBy({ top: -speed, behavior: 'auto' })
  if (window.innerHeight - e.clientY < edgeSize) window.scrollBy({ top: speed, behavior: 'auto' })
}

export default function AdminHomeServices({ setAdminNavActions }) {
  const [session, setSession] = useState(null)
  const [items, setItems] = useState([])
  const [baseItems, setBaseItems] = useState([])
  const [deletedIds, setDeletedIds] = useState(new Set())
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverId, setDragOverId] = useState(null)
  const [login, setLogin] = useState({ username: '', password: '' })
  const [form, setForm] = useState({ icon: 'Crown', title: '', price: '', duration_minutes: '' })
  const tempIdRef = useRef(0)

  const baseById = useMemo(() => new Map(baseItems.map((item) => [String(item.id), item])), [baseItems])

  const notify = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2500)
  }

  const refresh = async () => {
    const data = await getHomeServices()
    setItems(data)
    setBaseItems(data)
    setDeletedIds(new Set())
  }

  const refreshSession = async () => {
    const s = await authMe()
    setSession(s)
    return s
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

  const onLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await authLogin({ username: login.username, password: login.password })
      const s = await refreshSession()
      if (s.loggedIn) await refresh()
      notify('Sisse logitud')
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
      setItems([])
      notify('Välja logitud')
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }, [])

  const saveDraft = useCallback(async () => {
    setError(null)
    setBusy(true)
    try {
      for (const id of deletedIds) {
        await adminDeleteHomeService(id)
      }

      for (const item of withSort(items)) {
        const payload = {
          icon: item.icon,
          title: item.title,
          price: Number(item.price),
          duration_minutes: item.duration_minutes === '' || item.duration_minutes === undefined ? null : Number(item.duration_minutes),
          sort_order: item.sort_order
        }

        if (isTempId(item.id)) {
          await adminCreateHomeService(payload)
          continue
        }

        const base = baseById.get(String(item.id))
        const changed = base && (
          base.icon !== payload.icon ||
          base.title !== payload.title ||
          Number(base.price) !== payload.price ||
          (base.duration_minutes ?? null) !== (payload.duration_minutes ?? null) ||
          Number(base.sort_order) !== payload.sort_order
        )
        if (changed) await adminUpdateHomeService(item.id, payload)
      }

      await refresh()
      notify('Teenused salvestatud')
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }, [baseById, deletedIds, items])

  useEffect(() => {
    if (!setAdminNavActions) return undefined
    if (session?.loggedIn) {
      setAdminNavActions({ busy, onSave: saveDraft, onLogout, username: session.username })
    } else {
      setAdminNavActions(null)
    }
    return () => setAdminNavActions(null)
  }, [busy, saveDraft, onLogout, session?.loggedIn, session?.username, setAdminNavActions])

  const addItem = (e) => {
    e.preventDefault()
    setItems((current) => withSort([
      ...current,
      {
        id: `temp-${++tempIdRef.current}`,
        icon: form.icon,
        title: form.title,
        price: Number(form.price),
        duration_minutes: form.duration_minutes === '' ? null : Number(form.duration_minutes)
      }
    ]))
    setForm((current) => ({ ...current, title: '', price: '', duration_minutes: '' }))
    notify('Teenus lisatud mustandisse')
  }

  const updateItem = (id, patch) => {
    setItems((current) => current.map((item) => String(item.id) === String(id) ? { ...item, ...patch } : item))
  }

  const deleteItem = (id) => {
    if (!window.confirm('Kas oled kindel, et soovid selle teenuse kustutada?')) return
    if (!isTempId(id)) setDeletedIds((current) => new Set([...current, id]))
    setItems((current) => withSort(current.filter((item) => String(item.id) !== String(id))))
    notify('Teenus eemaldatud mustandist')
  }

  const onDragStart = (e, item) => {
    setDraggingId(item.id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(item.id))
  }

  const onDragEnd = () => {
    setDraggingId(null)
    setDragOverId(null)
  }

  const onDropItem = (e, targetId) => {
    e.preventDefault()
    const draggedId = e.dataTransfer.getData('text/plain')
    if (!draggedId || String(draggedId) === String(targetId)) return
    setItems((current) => {
      const next = [...current]
      const fromIndex = next.findIndex((item) => String(item.id) === String(draggedId))
      const toIndex = next.findIndex((item) => String(item.id) === String(targetId))
      if (fromIndex < 0 || toIndex < 0) return current
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return withSort(next)
    })
    notify('Järjekord muudetud mustandis')
    onDragEnd()
  }

  const onDragOver = (e) => {
    e.preventDefault()
    autoScrollDuringDrag(e)
  }

  return (
    <section className="pt-28 sm:pt-32 lg:pt-36 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <FadeInView>
          <div className="admin-panel bg-ivory p-5 sm:p-8 lg:p-10">
            <h1 className="font-serif text-3xl font-medium text-dark mb-6">Admin</h1>
            {error && <p className="text-sm text-rose font-light mb-6">{String(error.message || error)}</p>}
            {!session && <p className="text-sm text-warm-gray font-light">Laen...</p>}

            {session && !session.loggedIn && (
              <form onSubmit={onLogin} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
                <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={login.username} onChange={(e) => setLogin((v) => ({ ...v, username: e.target.value }))} placeholder="Kasutajanimi" required />
                <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={login.password} onChange={(e) => setLogin((v) => ({ ...v, password: e.target.value }))} placeholder="Salasõna" type="password" required />
                <div className="md:col-span-2 mt-3"><button disabled={busy} className="px-6 py-3 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500 disabled:opacity-60">Logi sisse</button></div>
              </form>
            )}

            {session?.loggedIn && (
              <>
                <div className="mb-10">
                  <h2 className="font-serif text-xl font-medium text-dark mb-4">Lisa teenus</h2>
                  <form onSubmit={addItem} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-3 border border-warm-gray/30 bg-cream px-3 py-2 min-w-0">
                      <span className="text-rose"><IconPreview name={form.icon} /></span>
                      <select className="flex-1 min-w-0 bg-transparent text-sm outline-none" value={form.icon} onChange={(e) => setForm((v) => ({ ...v, icon: e.target.value }))}>{icons.map((icon) => <option key={icon} value={icon}>{icon}</option>)}</select>
                    </div>
                    <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={form.title} onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))} placeholder="Pealkiri" required />
                    <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={form.price} onChange={(e) => setForm((v) => ({ ...v, price: e.target.value }))} placeholder="Hind" required />
                    <input className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm" value={form.duration_minutes} onChange={(e) => setForm((v) => ({ ...v, duration_minutes: e.target.value }))} placeholder="Ajakulu (min)" />
                    <div className="md:col-span-4 mt-3"><button disabled={busy} className="px-6 py-3 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500 disabled:opacity-60">Lisa</button></div>
                  </form>
                </div>

                <h2 className="font-serif text-xl font-medium text-dark mb-4">Teenused</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className={`border bg-cream p-4 transition-all duration-200 ${draggingId === item.id ? 'border-rose opacity-50 scale-[0.99]' : dragOverId === item.id ? 'border-rose bg-white shadow-sm translate-y-1' : 'border-warm-gray/30'}`} onDragOver={onDragOver} onDragEnter={() => setDragOverId(item.id)} onDragLeave={() => setDragOverId((id) => id === item.id ? null : id)} onDrop={(e) => onDropItem(e, item.id)}>
                      <div className="flex items-start gap-3">
                        <button type="button" draggable={!busy} disabled={busy} onDragStart={(e) => onDragStart(e, item)} onDragEnd={onDragEnd} className={`h-10 w-10 shrink-0 border bg-white text-warm-gray text-sm leading-none cursor-grab shadow-sm transition-all duration-200 ${draggingId === item.id ? 'border-rose text-rose shadow-md' : 'border-warm-gray/30'}`}>::</button>
                        <div className="grid flex-1 min-w-0 grid-cols-1 md:grid-cols-[minmax(170px,1fr)_minmax(220px,2fr)_minmax(110px,0.7fr)_minmax(130px,0.8fr)_auto] gap-3 items-center">
                          <div className="flex items-center gap-3 border border-warm-gray/30 bg-ivory px-3 py-2 min-w-0">
                            <span className="text-rose"><IconPreview name={item.icon} /></span>
                            <select className="flex-1 min-w-0 bg-transparent text-sm outline-none" value={item.icon} onChange={(e) => updateItem(item.id, { icon: e.target.value })}>{icons.map((icon) => <option key={icon} value={icon}>{icon}</option>)}</select>
                          </div>
                          <input className="min-w-0 border border-warm-gray/30 bg-ivory px-3 py-2 text-sm" value={item.title} onChange={(e) => updateItem(item.id, { title: e.target.value })} />
                          <input className="min-w-0 border border-warm-gray/30 bg-ivory px-3 py-2 text-sm" value={String(item.price)} onChange={(e) => updateItem(item.id, { price: e.target.value })} />
                          <input className="min-w-0 border border-warm-gray/30 bg-ivory px-3 py-2 text-sm" value={item.duration_minutes ?? ''} onChange={(e) => updateItem(item.id, { duration_minutes: e.target.value === '' ? null : Number(e.target.value) })} placeholder="min" />
                          <div className="flex justify-end"><button disabled={busy} className="px-5 py-2 border border-red-700 text-red-700 text-xs tracking-[0.15em] uppercase hover:bg-red-700 hover:text-cream transition disabled:opacity-60" onClick={() => deleteItem(item.id)}>Kustuta</button></div>
                        </div>
                      </div>
                    </div>
                  ))}
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
