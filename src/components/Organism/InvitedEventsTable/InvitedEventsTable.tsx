import { getRefreshToken } from "@lib/tokenService"
import eventRepository from "../../../repositories/eventRepository"
import { useEffect, useState } from "react"
import { IEvent } from "src/types/event"
import { EventsTableTitle } from "@components/Atoms/OrganizedEventsTableTitle"
import InvitedEventsTableRow from "@components/Molecules/InvitedEventsTableRow/InvitedEventsTableRow"

export default function InvitedEventsTable() {
  const [events, setEvents] = useState<IEvent[]>([])

  const getEvents = async (userId: string) => {
    const result = await eventRepository.getAllEventsByUserId(userId)
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
      <EventsTableTitle>Convites</EventsTableTitle>
      {
        events.map((event) => {
          return(
            <InvitedEventsTableRow key={event.id} event={event}/>
          )
        })
      }
    </div>
  )
}