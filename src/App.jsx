import { useState } from 'react'
import Hero from './components/Hero'
import ItineraryForm from './components/ItineraryForm'
import ItineraryResult from './components/ItineraryResult'
import Assistant from './components/Assistant'
import RouteShield from './components/RouteShield'

function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0220] via-[#0c0736] to-[#0b1c3f] text-white">
      <Hero />

      <section id="itinerary" className="relative z-10 container mx-auto px-6 -mt-24">
        <ItineraryForm onResult={setResult} />
        <ItineraryResult data={result} />
        <RouteShield />
        <Assistant />
        <div className="mt-12 text-center text-white/60 text-sm">
          Prices and AI responses are indicative. Connect your OpenAI key and provider APIs for production.
        </div>
      </section>
    </div>
  )
}

export default App
