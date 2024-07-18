import { DashboardMetrics } from "@components/Organism/DashboardMetrics"
import InvitedEventsTable from "@components/Organism/InvitedEventsTable/InvitedEventsTable"
import OrganizedEventsTable from "@components/Organism/OrganizedEventsTable/OrganizedEventTable"
import { Skeleton } from "@mui/material"
import { notifyError } from "@src/lib/toastsNotifier"
import { getRefreshToken } from "@src/lib/tokenService"
import eventRepository from "@src/repositories/eventRepository"
import { EventMetricsProps, IEvent } from "@src/types/event"
import { axiosErrorHandler } from "@src/utils/axiosErrorHandler"
import { useEffect, useState } from "react"

export default function HomeApp() {
  const [organizedEvents, setOrganizedEvents] = useState<IEvent[]>([])
  const [invitedEvents, setInvitedEvents] = useState<IEvent[]>([])
  const [metrics, setMetrics] = useState<EventMetricsProps>({
    createdEvents: 0,
    invitedEventsCount: 0,
    invitedPeople: 0
  })

  const getEvents = async (userId: string) => {
    try {
      const result = await eventRepository.getEventByOrganizer(userId)
      setOrganizedEvents(result.data.organizedEvents)
      setInvitedEvents(result.data.invitedEvents)
      setMetrics(result.data.metrics)
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage, 2500)
    }
  }

  useEffect(() => {
    const refresh_token = getRefreshToken()
    if (refresh_token) {
      const { userId } = refresh_token
      getEvents(userId)
    }
  }, [])

  if (!metrics || !organizedEvents) {
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
        <OrganizedEventsTable events={organizedEvents} />
        <InvitedEventsTable events={invitedEvents} />
      </div>
    </>
  )
}