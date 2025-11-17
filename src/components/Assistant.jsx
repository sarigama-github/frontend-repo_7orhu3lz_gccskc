import { useState } from 'react'

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your Travair buddy. Ask me anything about your trip.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, locale: 'en' })
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection issue. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="assistant" className="mt-12 rounded-2xl border border-white/20 bg-white/70 backdrop-blur p-4">
      <h3 className="text-lg font-semibold">Live AI Travel Assistant</h3>
      <div className="mt-3 max-h-72 overflow-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${m.role === 'user' ? 'ml-auto bg-violet-600 text-white' : 'bg-white border'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-3 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about plans, safety, or prices…" className="flex-1 rounded-lg border p-2"/>
        <button disabled={loading} className="rounded-lg bg-violet-600 text-white px-4 font-semibold disabled:opacity-60">Send</button>
      </form>
    </section>
  )
}
