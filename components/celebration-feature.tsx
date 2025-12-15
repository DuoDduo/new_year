interface CelebrationFeatureProps {
  emoji: string
  title: string
  description: string
  gradient: string
}

export function CelebrationFeature({ emoji, title, description, gradient }: CelebrationFeatureProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}>
        {emoji}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-400">{description}</div>
      </div>
    </div>
  )
}
