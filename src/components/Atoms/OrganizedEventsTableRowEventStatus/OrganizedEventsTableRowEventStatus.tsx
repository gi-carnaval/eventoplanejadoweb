import { getEventStatus } from "@lib/getEventStatus"

interface OrganizedEventsTableRowEventStatusProps {
  eventStatus: string
}

export default function OrganizedEventsTableRowEventStatus({ eventStatus }: OrganizedEventsTableRowEventStatusProps) {
  
  const status = getEventStatus(eventStatus)

  return (
    <span className={`flex md:text-base text-sm rounded-lg px-2 ${status === "Encerrado" ? 'bg-red-700' : status === "Em Andamento" ? 'bg-blue-700' : 'bg-green-700'}`}>{status}</span>
  )
}