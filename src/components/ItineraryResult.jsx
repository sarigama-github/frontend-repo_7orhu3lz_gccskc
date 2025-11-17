export default function ItineraryResult({ data }) {
  if (!data) return null
  if (data.error) return <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{data.error}</div>

  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-xl border border-white/30 bg-white/70 backdrop-blur p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h3 className="text-xl font-semibold">{data.destination} • {data.days} days</h3>
          <p className="text-sm text-gray-600">Estimated Cost: ${data.estimated_cost}</p>
        </div>
        {data.weather_notes && <p className="mt-1 text-gray-700 text-sm">{data.weather_notes}</p>}
        {data.safety_tips && data.safety_tips.length > 0 && (
          <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
            {data.safety_tips.map((t,i)=> <li key={i}>{t}</li>)}
          </ul>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.plan?.map((d) => (
          <div key={d.day} className="rounded-xl border border-white/30 bg-white/80 backdrop-blur p-4">
            <h4 className="font-semibold">{d.title}</h4>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
              {d.activities?.map((a,i)=> <li key={i}>{a}</li>)}
            </ul>
            {d.tips?.length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                <span className="font-medium">Tips:</span> {d.tips.join(' • ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
