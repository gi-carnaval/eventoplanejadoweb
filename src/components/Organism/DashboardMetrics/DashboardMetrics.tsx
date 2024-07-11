import { getRefreshToken } from "@lib/tokenService";
import eventRepository from "@repositories/eventRepository";
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
    <div className="flex w-full justify-between">
      <div className="flex flex-col gap-4 bg-[#19202a] border border-gray-400/20 p-5 w-[30%] rounded-lg">
        <h3 className="text-2xl">Eventos criados</h3>
        <span className="text-6xl">{`${metrics.createdEvents}`}</span>
      </div>
      <div className="flex flex-col gap-4 bg-[#19202a] border border-gray-400/20 p-5 w-[30%] rounded-lg">
        <h3 className="text-2xl">Pessoas Convidadas</h3>
        <span className="text-6xl">{`${metrics.invitedPeople}`}</span>
      </div>
      <div className="flex flex-col gap-4 bg-[#19202a] border border-gray-400/20 p-5 w-[30%] rounded-lg">
        <h3 className="text-2xl">Eventos Convidados</h3>
        <span className="text-6xl">{`${metrics.invitedEvents}`}</span>
      </div>
    </div>
  )
}