interface OrganizedEventsTableRowEventNameProps {
  children: React.ReactNode
}

export default function OrganizedEventsTableRowEventName({ children }: OrganizedEventsTableRowEventNameProps) {
  return (
    <div className="flex flex-col items-start">
      <h3 className="md:text-xl text-left text-ellipsis overflow-hidden w-full">{children}</h3>
    </div>
  )
}