import { useEffect, useMemo, useState } from 'react'
import FadeInView from '../components/FadeInView'
import { adminCreateService, adminDeleteService, adminUpdateService, getServices } from '../lib/api'

function flatten(grouped) {
  const rows = []
  for (const [category, services] of Object.entries(grouped || {})) {
    for (const s of services) rows.push({ ...s, category })
  }
  return rows
}

export default function Admin() {
  const [grouped, setGrouped] = useState(null)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  const rows = useMemo(() => flatten(grouped), [grouped])

  const [form, setForm] = useState({ category: 'Jumestus', name: '', price: '' })

  const refresh = async () => {
    const data = await getServices()
    setGrouped(data)
  }

  useEffect(() => {
    refresh().catch(setError)
  }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await adminCreateService({
        category: form.category,
        name: form.name,
        price: Number(form.price)
      })
      setForm((f) => ({ ...f, name: '', price: '' }))
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

            <div className="mb-8">
              <h2 className="font-serif text-xl font-medium text-dark mb-3">Admin token</h2>
              <p className="text-sm text-warm-gray font-light mb-3">
                Pane siia sama token, mis on serveris <code className="px-1">ADMIN_TOKEN</code> env.
              </p>
              <input
                className="w-full border border-warm-gray/30 bg-cream px-3 py-2 text-sm"
                placeholder="ADMIN_TOKEN"
                defaultValue={localStorage.getItem('ADMIN_TOKEN') || ''}
                onChange={(e) => localStorage.setItem('ADMIN_TOKEN', e.target.value)}
              />
            </div>

            <div className="mb-10">
              <h2 className="font-serif text-xl font-medium text-dark mb-4">Lisa teenus</h2>
              <form onSubmit={onCreate} className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                <div className="md:col-span-3">
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
              {error && <p className="text-sm text-rose font-light mb-4">{String(error.message || error)}</p>}
              {!grouped && <p className="text-sm text-warm-gray font-light">Laen...</p>}

              <div className="space-y-3">
                {rows.map((s) => (
                  <div key={s.id} className="border border-warm-gray/30 bg-cream p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
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
                      <div className="flex gap-2 justify-end">
                        <button
                          disabled={busy}
                          className="px-4 py-2 border border-rose text-rose text-xs tracking-[0.15em] uppercase hover:bg-rose hover:text-cream transition disabled:opacity-60"
                          onClick={() => onDelete(s.id)}
                        >
                          Kustuta
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
