import { useState } from 'react'

export default function RouteShield() {
  const [form, setForm] = useState({ origin: 'Delhi', destination: 'Goa', date: new Date().toISOString().slice(0,10), transport_mode: 'flight' })
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/routeshield`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const json = await res.json()
      setData(json)
    } catch (e) {
      setData({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-12 rounded-2xl border border-white/20 bg-white/70 backdrop-blur p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">RouteShield Safety</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Add-on ₹199</span>
      </div>
      <form onSubmit={submit} className="mt-3 grid md:grid-cols-5 gap-3">
        <input value={form.origin} onChange={e=>update('origin', e.target.value)} className="rounded-lg border p-2" placeholder="Origin" />
        <input value={form.destination} onChange={e=>update('destination', e.target.value)} className="rounded-lg border p-2" placeholder="Destination" />
        <input type="date" value={form.date} onChange={e=>update('date', e.target.value)} className="rounded-lg border p-2" />
        <select value={form.transport_mode} onChange={e=>update('transport_mode', e.target.value)} className="rounded-lg border p-2">
          <option value="flight">Flight</option>
          <option value="train">Train</option>
          <option value="bus">Bus</option>
          <option value="cab">Cab</option>
        </select>
        <button disabled={loading} className="rounded-lg bg-violet-600 text-white px-4 font-semibold disabled:opacity-60">{loading ? 'Scanning…' : 'Scan Risk'}</button>
      </form>
      {data && !data.error && (
        <div className="mt-4 grid md:grid-cols-3 gap-3">
          <div className="rounded-lg border bg-white p-3">
            <h4 className="font-semibold">Risks</h4>
            <ul className="mt-2 text-sm list-disc pl-5">
              {data.risks?.map((r, i) => <li key={i}><span className="font-medium capitalize">{r.type}</span> — {r.description} • <span className="text-xs">{r.mitigation}</span></li>)}
            </ul>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <h4 className="font-semibold">Alerts</h4>
            <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{data.alerts?.join('\n') || 'None'}</p>
          </div>
          <div className="rounded-lg border bg-white p-3">
            <h4 className="font-semibold">Alternatives & Support</h4>
            <ul className="mt-2 text-sm list-disc pl-5">
              {data.alternatives?.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
            <div className="mt-2 text-xs text-gray-600">Contacts: {data.support_contacts?.join(' • ')}</div>
          </div>
        </div>
      )}
      {data?.error && <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">{data.error}</div>}
    </section>
  )
}
