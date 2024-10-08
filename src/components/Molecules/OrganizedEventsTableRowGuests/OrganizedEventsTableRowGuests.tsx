import useDeviceType from "@src/hooks/useDeviceType";
import { EventUser } from "src/types/event";

interface OrganizedEventsTableRowGuestsProps {
  guestsDatas: {
    guests: EventUser[];
    guestNumber: number;
  }
}

export default function OrganizedEventsTableRowGuests({ guestsDatas }: OrganizedEventsTableRowGuestsProps) {

  const { guests, guestNumber } = guestsDatas
  const hasMorethanFourGuest = guestNumber >= 4
  const displayedGuests = guests.slice(0, 3);
  const additionalGuestNumber = guestNumber - 3

  const deviceType = useDeviceType()

  return (
    <div className="flex justify-center items-center gap-3 py-2 -mb-4 w-full">
      {guestNumber > 1 ? (
        <>
        {
          deviceType !== "mobile" && (
            <span className="text-sm text-zinc-400">Convidados</span>
          )
        }
          <div className="flex w-full">
            {
              displayedGuests.map((guest) => (
                <img key={guest.user.name} className={`rounded-full w-6 h-6 border-2 border-[#19202a] ${displayedGuests.length > 1 ? '-ml-3' : ''}`} src={guest.user.picture} alt={guest.user.name} title={guest.user.name} />
              ))
            }
            {
              hasMorethanFourGuest ? (
                <span className="rounded-full w-6 h-6 -ml-4 border-2 border-[#19202a] flex justify-center items-center bg-zinc-800 cursor-default" title={`Mais ${additionalGuestNumber} convidado${additionalGuestNumber > 1 ? 's' : ''}`}>+{additionalGuestNumber}</span>
              ) : null
            }
          </div>
        </>
      ) : (
        null
      )}

    </div>
  )
}