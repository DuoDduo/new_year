interface ResolutionCardProps {
  emoji: string
  title: string
  description: string
}

export function ResolutionCard({ emoji, title, description }: ResolutionCardProps) {
  return (
    <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
