interface MetricCardProps {
  cardTitle: string;
  metric: number
}

export default function MetricCard({cardTitle, metric}: MetricCardProps) {
  return (
    <div className="flex flex-col md:gap-4 gap-2 bg-[#19202a] border border-gray-400/20 md:p-5 p-3 md:w-[30%] rounded-lg">
      <h3 className="md:text-2xl">{cardTitle}</h3>
      <span className="md:text-6xl text-4xl">{metric || 0}</span>
    </div>
  )
}