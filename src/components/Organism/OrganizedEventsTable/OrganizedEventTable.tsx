import { IEvent } from "src/types/event"
import { OrganizedEventsTableRow } from "@components/Molecules/OrganizedEventsTableRow"
import { EventsTableTitle } from "@components/Atoms/OrganizedEventsTableTitle"

interface OrganizedEventsTableProps {
  events: IEvent[]
}

export default function OrganizedEventsTable({ events }: OrganizedEventsTableProps) {

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