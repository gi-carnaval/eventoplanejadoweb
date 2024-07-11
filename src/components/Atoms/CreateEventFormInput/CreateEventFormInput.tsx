
interface CreateEventFormInput {
  children: React.ReactNode
}


export default function CreateEventFormInput({ children }: CreateEventFormInput) {
  return (
    <div className="flex flex-col items-start w-full gap-2" >
      {children}
    </div>
  )
}