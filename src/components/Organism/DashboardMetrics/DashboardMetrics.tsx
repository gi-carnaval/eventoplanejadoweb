import { getRefreshToken } from "@lib/tokenService";
import eventRepository from "@repositories/eventRepository";
import { MetricCard } from "@src/components/Atoms/MetricCard";
import { useEffect, useState } from "react";
import { EventMetricsProps } from "src/types/event";

export default function DashboardMetrics() {

  const [metrics, setMetrics] = useState<EventMetricsProps>({
    createdEvents: 0,
    invitedEvents: 0,
    invitedPeople: 0,
  })

  const getMetrics = async (userId: string) => {
    const result = await eventRepository.getEventsMetrics(userId)
    setMetrics(result.data)
  }

  useEffect(() => {
    const refresh_token = getRefreshToken()
    if (refresh_token) {
      const { userId } = refresh_token
      getMetrics(userId)
    }
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
      <MetricCard cardTitle="Eventos Criados" metric={metrics.createdEvents} />
      <MetricCard cardTitle="Pessoas Convidadas" metric={metrics.invitedPeople} />
      <MetricCard cardTitle="Eventos Convidados" metric={metrics.invitedEvents} />
    </div>
  )
}