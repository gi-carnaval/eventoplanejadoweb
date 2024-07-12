import { getRefreshToken } from "@lib/tokenService"
import eventRepository from "../../../repositories/eventRepository"
import { useEffect, useState } from "react"
import { IEvent } from "src/types/event"
import { OrganizedEventsTableRow } from "@components/Molecules/OrganizedEventsTableRow"
import { EventsTableTitle } from "@components/Atoms/OrganizedEventsTableTitle"

export default function OrganizedEventsTable() {
  const [events, setEvents] = useState<IEvent[]>([])

  const getEvents = async (userId: string) => {
    const result = await eventRepository.getEventByOrganizer(userId)
    setEvents(result.data)
  }

  useEffect(() => {
    const refresh_token = getRefreshToken()
    if (refresh_token) {
      const { userId } = refresh_token
      getEvents(userId)
    }
  }, [])
  return (
    <div className="border w-full border-gray-400/20 bg-gray-400/20 backdrop-blur-sm rounded-lg overflow-hidden">
      <EventsTableTitle>Eventos Organizados</EventsTableTitle>
      <div className="overflow-auto max-h-96">
        {
          events.map((event) => {
            return (
              <OrganizedEventsTableRow key={event.id} event={event} />
            )
          })
        }
      </div>
    </div>
  )
}