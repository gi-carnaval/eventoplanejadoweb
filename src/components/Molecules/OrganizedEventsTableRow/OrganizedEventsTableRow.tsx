import OrganizedEventsTableRowEventName from "@components/Atoms/OrganizedEventsTableRowEventName/OrganizedEventsTableRowEventName"
import dayjs from "dayjs"
import { IEvent } from "src/types/event"
import OrganizedEventsTableRowGuests from "../OrganizedEventsTableRowGuests/OrganizedEventsTableRowGuests"
import OrganizedEventsTableRowEventStatus from "@components/Atoms/OrganizedEventsTableRowEventStatus/OrganizedEventsTableRowEventStatus"
import { Link } from "react-router-dom"

interface EventTableRowProps {
  event: IEvent
}

export default function OrganizedEventsTableRow({ event }: EventTableRowProps) {
  const eventDate = dayjs(event.startDateTime).format('DD/MM/YYYY')
  const guestsData = {
    guests: event.EventUser,
    guestNumber: event._count.EventUser
  }

  return (
    <div className="flex flex-row justify-between items-center border bg-[#19202a] border-gray-400/20 px-4 py-2 gap-4">
      <div className="flex flex-col items-start md:gap-4 gap-3">
        <div className="flex flex-col items-center">
          <OrganizedEventsTableRowEventName>{event.name}</OrganizedEventsTableRowEventName>
        </div>
        <div className="flex justify-start items-end">
          <OrganizedEventsTableRowEventStatus eventStatus={event.status} />
        </div>
        <div className="flex justify-between items-center gap-8 md:text-sm text-xs text-zinc-400 text-left">
          <span>Data: {eventDate}</span>
        </div>
      </div>
      <div className="flex flex-col items-end md:w-4/12">
        <Link to={`/organizer/${event.id}`} className="bg-stone-900 px-4 py-2 rounded-lg text-white font-normal hover:scale-[0.99] hover:brightness-110">Detalhes</Link>
        <OrganizedEventsTableRowGuests guestsDatas={guestsData} />
      </div>
    </div>
  )
}