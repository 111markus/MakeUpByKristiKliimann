import { useEffect, useMemo, useState } from 'react'
import FadeInView from '../components/FadeInView'
import {
  adminCreateService,
  adminDeleteService,
  adminUpdateService,
  authLogin,
  authLogout,
  authMe,
  getServices
} from '../lib/api'

function flatten(grouped) {
  const rows = []
  for (const [category, services] of Object.entries(grouped || {})) {
    for (const s of services) rows.push({ ...s, category })
  }
  return rows
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [grouped, setGrouped] = useState(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const [login, setLogin] = useState({ username: '', password: '' })

  const rows = useMemo(() => flatten(grouped), [grouped])

  const [form, setForm] = useState({ category: 'Jumestus', name: '', description: '', duration_minutes: '', price: '' })

  const refreshSession = async () => {
    const s = await authMe()
    setSession(s)
    return s
  }

  const refresh = async () => {
    const data = await getServices()
    setGrouped(data)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const s = await refreshSession()
        if (s.loggedIn) await refresh()
      } catch (e) {
        setError(e)
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
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  const onLogout = async () => {
    setError(null)
    setBusy(true)
    try {
      await authLogout()
      await refreshSession()
      setGrouped(null)
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  const onCreate = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await adminCreateService({
        category: form.category,
        name: form.name,
        description: form.description,
        duration_minutes: form.duration_minutes === '' ? null : Number(form.duration_minutes),
        price: Number(form.price)
      })
      setForm((f) => ({ ...f, name: '', description: '', duration_minutes: '', price: '' }))
      await refresh()
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  const onQuickEdit = async (id, patch) => {
    setError(null)
    setBusy(true)
    try {
      await adminUpdateService(id, patch)
      await refresh()
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  const onDelete = async (id) => {
    setError(null)
    setBusy(true)
    try {
      await adminDeleteService(id)
      await refresh()
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <FadeInView>
          <div className="bg-ivory p-8 lg:p-10">
            <h1 className="font-serif text-3xl font-medium text-dark mb-6">Admin</h1>

            {error && <p className="text-sm text-rose font-light mb-6">{String(error.message || error)}</p>}

            {!session && <p className="text-sm text-warm-gray font-light">Laen...</p>}

            {session && !session.loggedIn && (
              <div className="mb-10">
                <h2 className="font-serif text-xl font-medium text-dark mb-4">Logi sisse</h2>
                <form onSubmit={onLogin} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm"
                    value={login.username}
                    onChange={(e) => setLogin((v) => ({ ...v, username: e.target.value }))}
                    placeholder="Nimi (username)"
                    autoComplete="username"
                    required
                  />
                  <input
                    className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm"
                    value={login.password}
                    onChange={(e) => setLogin((v) => ({ ...v, password: e.target.value }))}
                    placeholder="Parool (password)"
                    type="password"
                    autoComplete="current-password"
                    required
                  />
                  <div className="md:col-span-2">
                    <button
                      disabled={busy}
                      className="px-6 py-3 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500 disabled:opacity-60"
                      type="submit"
                    >
                      Logi sisse
                    </button>
                  </div>
                </form>
              </div>
            )}

            {session && session.loggedIn && (
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-warm-gray font-light">Sisse logitud: {session.username}</p>
                <button
                  disabled={busy}
                  className="px-4 py-2 border border-warm-gray/30 text-dark text-xs tracking-[0.15em] uppercase hover:bg-dark hover:text-cream transition disabled:opacity-60"
                  onClick={onLogout}
                >
                  Logi välja
                </button>
              </div>
            )}

            {session && session.loggedIn && (
              <>
                <div className="mb-10">
                  <h2 className="font-serif text-xl font-medium text-dark mb-4">Lisa teenus</h2>
                  <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input
                      className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm"
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      placeholder="Kategooria"
                    />
                    <input
                      className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Nimi"
                      required
                    />
                    <input
                      className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                      placeholder="Hind (nt 55)"
                      required
                    />
                    <input
                      className="border border-warm-gray/30 bg-cream px-3 py-2 text-sm"
                      value={form.duration_minutes}
                      onChange={(e) => setForm((f) => ({ ...f, duration_minutes: e.target.value }))}
                      placeholder="Ajakulu (min)"
                    />
                    <textarea
                      className="md:col-span-4 border border-warm-gray/30 bg-cream px-3 py-2 text-sm"
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Kirjeldus"
                      rows={3}
                    />
                    <div className="md:col-span-4">
                      <button
                        disabled={busy}
                        className="px-6 py-3 bg-rose text-cream text-xs tracking-[0.2em] uppercase font-medium hover:bg-dark transition-all duration-500 disabled:opacity-60"
                        type="submit"
                      >
                        Salvesta
                      </button>
                    </div>
                  </form>
                </div>

                <div>
                  <h2 className="font-serif text-xl font-medium text-dark mb-4">Teenused</h2>
                  {!grouped && <p className="text-sm text-warm-gray font-light">Laen...</p>}

                  <div className="space-y-3">
                    {rows.map((s) => (
                      <div key={s.id} className="border border-warm-gray/30 bg-cream p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
                          <input
                            className="border border-warm-gray/30 bg-ivory px-3 py-2 text-sm"
                            defaultValue={s.category}
                            onBlur={(e) => {
                              const value = e.target.value
                              if (value !== s.category) onQuickEdit(s.id, { category: value })
                            }}
                          />
                          <input
                            className="border border-warm-gray/30 bg-ivory px-3 py-2 text-sm"
                            defaultValue={s.name}
                            onBlur={(e) => {
                              const value = e.target.value
                              if (value !== s.name) onQuickEdit(s.id, { name: value })
                            }}
                          />
                          <input
                            className="border border-warm-gray/30 bg-ivory px-3 py-2 text-sm"
                            defaultValue={String(s.price)}
                            onBlur={(e) => {
                              const value = Number(e.target.value)
                              if (Number.isFinite(value) && value !== s.price) onQuickEdit(s.id, { price: value })
                            }}
                          />
                          <input
                            className="border border-warm-gray/30 bg-ivory px-3 py-2 text-sm"
                            defaultValue={s.duration_minutes === null || s.duration_minutes === undefined ? '' : String(s.duration_minutes)}
                            placeholder="min"
                            onBlur={(e) => {
                              const raw = e.target.value
                              if (raw === '') {
                                if (s.duration_minutes !== null && s.duration_minutes !== undefined) onQuickEdit(s.id, { duration_minutes: null })
                                return
                              }
                              const value = Number(raw)
                              if (Number.isInteger(value) && value >= 0 && value !== s.duration_minutes) {
                                onQuickEdit(s.id, { duration_minutes: value })
                              }
                            }}
                          />
                          <div className="flex gap-2 justify-end">
                            <button
                              disabled={busy}
                              className="px-4 py-2 border border-rose text-rose text-xs tracking-[0.15em] uppercase hover:bg-rose hover:text-cream transition disabled:opacity-60"
                              onClick={() => onDelete(s.id)}
                            >
                              Kustuta
                            </button>
                          </div>
                          <textarea
                            className="md:col-span-5 border border-warm-gray/30 bg-ivory px-3 py-2 text-sm"
                            defaultValue={s.description || ''}
                            onBlur={(e) => {
                              const value = e.target.value
                              if (value !== (s.description || '')) onQuickEdit(s.id, { description: value })
                            }}
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
