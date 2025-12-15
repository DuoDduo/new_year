interface StatCardProps {
  value: string | number
  label: string
  color: string
}

export function StatCard({ value, label, color }: StatCardProps) {
  return (
    <div className="text-center">
      <div className={`text-3xl md:text-4xl font-bold ${color} mb-2`}>{value}</div>
      <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  )
}
