import { Skeleton } from "@mui/material";
import { BackButton } from "@src/components/Atoms/BackButton";
import OrganizedEventsTableRowEventName from "@src/components/Atoms/OrganizedEventsTableRowEventName/OrganizedEventsTableRowEventName";
import { notifyError } from "@src/lib/toastsNotifier";
import { getRefreshToken } from "@src/lib/tokenService";
import { compare } from "@src/lib/utils";
import eventInvitationRepository from "@src/repositories/eventInvitationRepository";
import { axiosErrorHandler } from "@src/utils/axiosErrorHandler";
import { useEffect, useState } from "react";

const eventRequestStatus = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  REJECTED: "Recusado"
}

interface EventRequestEventProps {
  name: string,
  address: string,
  startDateTime: Date
}

export interface EventRequestProps {
  id: string
  event: EventRequestEventProps,
  status: "REJECTED" | "PENDING" | "APPROVED",
}

export default function EventRequest() {
  const [requests, setRequests] = useState<EventRequestProps[]>()

  const getEventRequests = async (userId: string) => {
    try {
      const response = await eventInvitationRepository.getInvitesrequest(userId)
      setRequests(response.data)
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage)
    }
  }

  useEffect(() => {
    const refresh_token = getRefreshToken()

    if (refresh_token) {
      getEventRequests(refresh_token.userId)
    }

  }, [])

  if (requests === undefined) {
    return (
      <>
        <h1 className="md:text-inherit text-3xl">Carregando Solicitações</h1>
        <div className="border w-full border-gray-400/20 bg-gray-400/20 backdrop-blur-sm rounded-lg">
          <div className="overflow-auto max-h-96">
            <div className="flex flex-row text-white justify-between items-center border bg-[#19202a] border-gray-400/20 px-6 py-4 gap-4">
              <div className="flex flex-col items-start md:gap-4 gap-3">
                <div className="flex flex-col items-center">
                  <Skeleton className="md:w-80 w-40" height={40} />
                </div>
              </div>
              <span className={`w-7 h-7 rounded-full text-lg text-white flex justify-center items-center bg-red-700`}>
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-red-500 opacity-30"></span>
              </span>
            </div>
            <div className="flex flex-row text-white justify-between items-center border bg-[#19202a] border-gray-400/20 px-6 py-4 gap-4">
              <div className="flex flex-col items-start md:gap-4 gap-3">
                <div className="flex flex-col items-center">
                  <Skeleton className="md:w-80 w-40" height={40} />
                </div>
              </div>
              <span className={`w-7 h-7 rounded-full text-lg text-white flex justify-center items-center bg-red-700`}>
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-red-500 opacity-30"></span>
              </span>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <BackButton />
      <h1 className="md:text-inherit text-3xl">Solicitações para os Eventos</h1>
      <div className="border w-full border-gray-400/20 bg-gray-400/20 backdrop-blur-sm rounded-lg">
        <div className="overflow-auto max-h-96">
          {
            requests && requests.sort(compare).map(({ event,id, status }) => {
              return (
                <div key={id} className={`flex flex-row ${status === "PENDING" ? 'text-yellow-500' : status === "APPROVED" ? 'text-green-500' : 'text-red-500'} justify-between items-center border border-gray-400/20 px-6 py-4 gap-4`}>
                  <div className="flex flex-col items-start md:gap-4 gap-3">
                    <div className="flex flex-col items-center">
                      <OrganizedEventsTableRowEventName>{event.name}</OrganizedEventsTableRowEventName>
                    </div>
                  </div>
                  <span>{eventRequestStatus[status]}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}