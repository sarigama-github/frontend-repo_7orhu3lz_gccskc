import { useState } from 'react'

export default function ItineraryForm({ onResult }) {
  const [destination, setDestination] = useState('Goa')
  const [days, setDays] = useState(4)
  const [budget, setBudget] = useState(500)
  const [prefs, setPrefs] = useState(['adventure'])
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/itinerary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days: Number(days), budget: Number(budget), preferences: prefs }),
      })
      const data = await res.json()
      onResult?.(data)
    } catch (err) {
      onResult?.({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  const togglePref = (p) => {
    setPrefs((prev) => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const bubbles = ['adventure','luxury','romantic','solo','family']

  return (
    <form onSubmit={submit} className="w-full bg-white/80 backdrop-blur rounded-xl p-5 shadow border border-white/20">
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm text-gray-700">Destination</label>
          <input value={destination} onChange={e=>setDestination(e.target.value)} className="mt-1 w-full rounded-lg border p-2" placeholder="e.g., Bali"/>
        </div>
        <div>
          <label className="text-sm text-gray-700">Days</label>
          <input type="number" value={days} onChange={e=>setDays(e.target.value)} className="mt-1 w-full rounded-lg border p-2" min={1} max={30}/>
        </div>
        <div>
          <label className="text-sm text-gray-700">Budget ($)</label>
          <input type="number" value={budget} onChange={e=>setBudget(e.target.value)} className="mt-1 w-full rounded-lg border p-2" min={0}/>
        </div>
        <div className="flex items-end">
          <button disabled={loading} className="w-full rounded-lg bg-violet-600 text-white py-2 font-semibold hover:bg-violet-700 disabled:opacity-60">
            {loading ? 'Generating…' : 'Generate'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {bubbles.map(p => (
          <button type="button" key={p} onClick={()=>togglePref(p)} className={`px-3 py-1 rounded-full text-sm border ${prefs.includes(p) ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-gray-700'}`}>
            {p}
          </button>
        ))}
      </div>
    </form>
  )
}
