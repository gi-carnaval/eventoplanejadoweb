import { Skeleton } from "@mui/material";
import { MetricCard } from "@src/components/Atoms/MetricCard";
import { EventMetricsProps } from "src/types/event";

interface DashboardMetricsProps {
  metrics: EventMetricsProps
}

export default function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  if (!metrics) {
    return (
      <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
        <Skeleton variant="rounded" width={210} height={60} animation="wave" />
        <Skeleton variant="rounded" width={210} height={60} animation="wave" />
        <Skeleton variant="rounded" width={210} height={60} animation="wave" />
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
      <MetricCard cardTitle="Eventos Criados" metric={metrics.createdEvents} />
      <MetricCard cardTitle="Pessoas Convidadas" metric={metrics.invitedPeople} />
      <MetricCard cardTitle="Eventos Convidados" metric={metrics.invitedEventsCount} />
    </div>
  )
}