import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-[#0a0118] via-[#0b0330] to-[#0a1b3a] text-white">
      <div className="absolute inset-0 opacity-70">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live AI Travel Assistant
        </span>
        <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Travair
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300">
            Your Futuristic AI Travel OS
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Plan, book, and travel with a hybrid AI that personalizes every detail. Itinerary engine, RouteShield safety, price optimization, and a real-time assistant — all in one.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href="#itinerary" className="inline-flex items-center justify-center rounded-lg bg-violet-500 hover:bg-violet-600 text-white px-5 py-3 font-semibold transition-colors">Generate Itinerary</a>
          <a href="#assistant" className="inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white px-5 py-3 font-semibold transition-colors">Talk to Assistant</a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.25),transparent_45%),radial-gradient(circle_at_70%_20%,rgba(249,115,22,0.2),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(14,165,233,0.2),transparent_35%)]" />
    </section>
  )
}
