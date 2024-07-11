interface OrganizedEventsTableRowEventNameProps {
  children: React.ReactNode
}

export default function OrganizedEventsTableRowEventName({ children }: OrganizedEventsTableRowEventNameProps) {
  return (
    <div className="flex flex-col items-start">
      <h3 className="text-xl">{children}</h3>
    </div>
  )
}