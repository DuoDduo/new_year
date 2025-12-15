import { CelebrationFeature } from "./celebration-feature"

export function CelebrationSection() {
  const features = [
    {
      emoji: "🌟",
      title: "Fresh Perspectives",
      description: "See the world with renewed vision",
      gradient: "from-orange-500 to-pink-500",
    },
    {
      emoji: "💫",
      title: "Endless Possibilities",
      description: "365 days of opportunity",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      emoji: "❤️",
      title: "Unity & Joy",
      description: "Celebrate together as one",
      gradient: "from-pink-500 to-red-500",
    },
  ]

  return (
    <section id="celebration" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 glow">Why We Celebrate</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-orange-400">New Beginnings</h3>
            <p className="text-lg text-gray-300 mb-6">
              Every new year brings a fresh start, a blank canvas waiting for your unique story. It&apos;s a time to
              reflect on growth, celebrate achievements, and embrace the unknown adventures ahead.
            </p>
            <p className="text-lg text-gray-300">
              Together, we welcome 2026 with open hearts, boundless optimism, and the collective energy of millions
              around the world starting anew.
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-12">
            <div className="text-6xl mb-6 text-center">🎉</div>
            <div className="space-y-4">
              {features.map((feature) => (
                <CelebrationFeature key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
