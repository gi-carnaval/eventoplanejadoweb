interface EventsTableTitleProps {
  children: React.ReactNode
}

export default function EventsTableTitle({ children }: EventsTableTitleProps) {
  return (
    <span className="text-lg font-bold h-10 flex justify-center items-center">{children}</span>
  )
}