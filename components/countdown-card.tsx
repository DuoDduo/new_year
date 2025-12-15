interface CountdownCardProps {
  value: string | number
  label: string
  color: string
}

export function CountdownCard({ value, label, color }: CountdownCardProps) {
  return (
    <div className="glass-effect rounded-2xl p-8 text-center">
      <div className={`text-5xl md:text-6xl font-bold ${color} mb-2`}>{value}</div>
      <div className="text-gray-400 uppercase tracking-wider text-sm">{label}</div>
    </div>
  )
}
