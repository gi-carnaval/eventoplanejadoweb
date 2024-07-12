import { BackButton } from "@src/components/Atoms/BackButton"
import OrganizedEventsTableRowEventName from "@src/components/Atoms/OrganizedEventsTableRowEventName/OrganizedEventsTableRowEventName"
import { notifyError } from "@src/lib/toastsNotifier"
import { getRefreshToken } from "@src/lib/tokenService"
import eventInvitationRepository from "@src/repositories/eventInvitationRepository"
import { axiosErrorHandler } from "@src/utils/axiosErrorHandler"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface Event {
  id: string;
  name: string;
  _count: {
    EventInvitation: number;
  };
}

interface EventData {
  event: Event;
}

export default function Notifications() {
  const [requests, setRequests] = useState<EventData[]>()

  const getRequests = async (userId: string) => {
    try {
      const result = await eventInvitationRepository.getInvites(userId)
      setRequests(result.data)
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage, 2500)
    }
  }

  useEffect(() => {
    const refresh_token = getRefreshToken()
    if (refresh_token) {
      const { userId } = refresh_token
      getRequests(userId)
    }
  }, []);

  if (!requests) {
    <>
      <BackButton />
      <h1>Nenhuma Dolicitação de Convite</h1>
    </>
  }

  return (
    <>
      <BackButton />
      <h1>Solicitações para os Eventos</h1>
      <div className="border w-full border-gray-400/20 bg-gray-400/20 backdrop-blur-sm rounded-lg overflow-hidden">
        <div className="overflow-auto h-96">
          {
            requests && requests.map(({ event }) => {
              return (
                <Link to={`/organizer/${event.id}`}>
                  <div className="flex flex-row text-white justify-between items-center border bg-[#19202a] border-gray-400/20 px-6 py-4 gap-4">
                    <div className="flex flex-col items-start md:gap-4 gap-3">
                      <div className="flex flex-col items-center">
                        <OrganizedEventsTableRowEventName>{event.name}</OrganizedEventsTableRowEventName>
                      </div>
                    </div>
                    <span className={`w-7 h-7 rounded-full text-lg text-white flex justify-center items-center bg-red-700`}>
                      {event._count.EventInvitation}
                      <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-red-500 opacity-30"></span>
                    </span>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </>
  )
}