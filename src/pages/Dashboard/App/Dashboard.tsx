import { DashboardMetrics } from "@components/Organism/DashboardMetrics"
import InvitedEventsTable from "@components/Organism/InvitedEventsTable/InvitedEventsTable"
import OrganizedEventsTable from "@components/Organism/OrganizedEventsTable/OrganizedEventTable"
import { Skeleton } from "@mui/material"
import { getRefreshToken } from "@src/lib/tokenService"
import eventRepository from "@src/repositories/eventRepository"
import { EventMetricsProps, IEvent } from "@src/types/event"
import { useEffect, useState } from "react"

export default function HomeApp() {

  const [events, setEvents] = useState<IEvent[]>([])
  const [metrics, setMetrics] = useState<EventMetricsProps>()

  const getEvents = async (userId: string) => {
    const result = await eventRepository.getEventByOrganizer(userId)
    setEvents(result.data.events)
    setMetrics(result.data.metrics)
  }

  useEffect(() => {
    const refresh_token = getRefreshToken()
    if (refresh_token) {
      const { userId } = refresh_token
      getEvents(userId)
    }
  }, [])

  if (!metrics || !events) {
    return (
      <>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
          <div className="flex flex-col items-center md:gap-4 gap-2 bg-[#19202a] border border-gray-400/20 md:p-5 p-3 md:w-[30%] rounded-lg">
            <h3 className="md:text-2xl">Eventos Criados</h3>
            <Skeleton variant="rounded" height={40} animation="wave" className="w-[10%]" />
          </div>
          <div className="flex flex-col items-center md:gap-4 gap-2 bg-[#19202a] border border-gray-400/20 md:p-5 p-3 md:w-[30%] rounded-lg">
            <h3 className="md:text-2xl">Pessoas Convidadas</h3>
            <Skeleton variant="rounded" height={40} animation="wave" className="w-[10%]" />
          </div>
          <div className="flex flex-col items-center md:gap-4 gap-2 bg-[#19202a] border border-gray-400/20 md:p-5 p-3 md:w-[30%] rounded-lg">
            <h3 className="md:text-2xl">Eventos Convidados</h3>
            <Skeleton variant="rounded" height={40} animation="wave" className="w-[10%]" />
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-20 justify-between">
          <Skeleton variant="rounded" width="100%" height={300} animation="wave" />
        </div>
      </>
    )
  }

  return (
    <>

      <DashboardMetrics metrics={metrics} />
      <div className="flex md:flex-row flex-col gap-20 justify-between">
        <OrganizedEventsTable events={events} />
        <InvitedEventsTable />
      </div>
    </ >
  )
}