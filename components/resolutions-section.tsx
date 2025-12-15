import { ResolutionCard } from "./resolution-card"

export function ResolutionsSection() {
  const resolutions = [
    {
      emoji: "🎯",
      title: "Set Goals",
      description: "Define clear, achievable objectives that will guide your journey through 2026",
    },
    {
      emoji: "💪",
      title: "Stay Strong",
      description: "Build resilience and maintain momentum throughout the year with determination",
    },
    {
      emoji: "✨",
      title: "Shine Bright",
      description: "Embrace opportunities and let your authentic self illuminate every moment",
    },
  ]

  return (
    <section
      id="resolutions"
      className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent via-purple-900 via-opacity-10 to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-8 glow">Make 2026 Count</h2>
        <p className="text-xl text-center text-gray-300 mb-16 max-w-2xl mx-auto">
          Set your intentions and make this year your best one yet
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {resolutions.map((resolution) => (
            <ResolutionCard key={resolution.title} {...resolution} />
          ))}
        </div>
      </div>
    </section>
  )
}
