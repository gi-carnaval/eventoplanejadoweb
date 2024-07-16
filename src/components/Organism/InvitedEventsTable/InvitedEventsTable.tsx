import { EventsTableTitle } from "@components/Atoms/OrganizedEventsTableTitle"
import InvitedEventsTableRow from "@components/Molecules/InvitedEventsTableRow/InvitedEventsTableRow"
import { IEvent } from "@src/types/event"

interface InvitedEventsTableProps {
  events: IEvent[]
}

export default function InvitedEventsTable({ events }: InvitedEventsTableProps) {
  return (
    <div className="border w-full border-gray-400/20 bg-gray-400/20 backdrop-blur-sm rounded-lg overflow-hidden">
      <EventsTableTitle>Convites</EventsTableTitle>
      <div className="overflow-auto max-h-96">
        {
          events.map((event) => {
            return (
              <InvitedEventsTableRow key={event.id} event={event} />
            )
          })
        }
      </div>
    </div>
  )
}