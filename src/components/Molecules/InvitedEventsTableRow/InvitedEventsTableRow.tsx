import OrganizedEventsTableRowEventName from "@components/Atoms/OrganizedEventsTableRowEventName/OrganizedEventsTableRowEventName"
import dayjs from "dayjs"
import { IEvent } from "src/types/event"
import OrganizedEventsTableRowEventStatus from "@components/Atoms/OrganizedEventsTableRowEventStatus/OrganizedEventsTableRowEventStatus"
import { Link } from "react-router-dom"

interface InvitedEventsTableRowProps {
  event: IEvent
}

export default function InvitedEventsTableRow({ event }: InvitedEventsTableRowProps) {
  const eventDate = dayjs(event.startDateTime).format('DD/MM/YYYY')
  return (
    <div className="flex flex-row justify-between items-center border bg-[#19202a] border-gray-400/20 px-4 py-2 gap-4">
      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col justify-start">
          <OrganizedEventsTableRowEventName>{event.name}</OrganizedEventsTableRowEventName>
        </div>
        <div className="flex justify-start items-start">
          <OrganizedEventsTableRowEventStatus eventStatus={event.status} />
        </div>
        <div className="flex justify-around items-stretch gap-8 text-sm text-zinc-400 text-left">
          <span>Data: {eventDate}</span>
        </div>
      </div>
      <Link to={`/participant/${event.id}`} className="bg-stone-900 px-4 py-2 rounded-lg text-white font-normal">Detalhes</Link>
    </div>
  )
}