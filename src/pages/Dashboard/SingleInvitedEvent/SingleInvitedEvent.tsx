import { notifyError, notifyInfo } from "@lib/toastsNotifier"
import { getRefreshToken } from "@lib/tokenService"
import eventRepository from "@repositories/eventRepository"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axiosErrorHandler } from "../../../utils/axiosErrorHandler"
import { BackButton } from "@src/components/Atoms/BackButton"
import { Skeleton } from "@mui/material"
import dayjs from "dayjs"

interface Event {
  address: string;
  createdAt: string;
  description: string;
  endDateTime: string;
  id: string;
  name: string;
  startDateTime: string;
  status: string;
}

export default function SingleInvitedEvent() {
  const { eventId } = useParams()
  const [event, setEvent] = useState<Event>()

  const navigate = useNavigate()

  useEffect(() => {

    const getEvent = async (userId: string, eventId: string) => {
      try {
        const result = await eventRepository.getInvitedEvent(userId, eventId)
        setEvent(result.data)
      } catch (error) {
        const errorMessage = axiosErrorHandler(error)
        notifyError(errorMessage)
        console.error(errorMessage)
        notifyInfo("Redirecionando para a home")
        setTimeout(() => {
          navigate("/app")
        }, 5000)
      }
    }

    const refresh_token = getRefreshToken()
    if (refresh_token && eventId) {
      const { userId } = refresh_token
      getEvent(userId, eventId)
    }
  }, [eventId, navigate])

  if (!event) {
    return (
      <>
        <div className="w-full flex flex-col items-center gap-20">
          <div className="bg-slate-600/20 rounded-xl md:p-10 py-10 md:w-7/12 w-full flex flex-col justify-center items-center gap-8 backdrop-blur-sm border border-gray-400/20 text-lg">
            <div className="flex flex-col gap-4 w-full md:px-20 px-5">
              <Skeleton width="50%" height={40} />
              <Skeleton width="100%" height={70} />
              <div className="flex flex-col justify-around items-start gap-2">
                <Skeleton width="100%" />
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full md:px-20 px-5">
              <div className="flex flex-col justify-around items-start gap-2">
                <Skeleton width="100%" />
              </div>
              <div className="flex flex-col justify-around items-start gap-2">
                <Skeleton width="100%" />
              </div>
              <div className="flex flex-col justify-around items-start gap-2">
                <Skeleton width="100%" />
              </div>
              <div className="flex flex-col justify-around items-start gap-2">
                <Skeleton width="100%" />
              </div>
              <Skeleton width="100%" />
            </div>
          </div>
        </div>
      </>
    )
  }

  const startDate = dayjs(event.startDateTime).format("DD/MM/YYYY")
  const startTime = dayjs(event.startDateTime).format("HH:mm")

  return (
    <>
      <BackButton />
      <div className="w-full flex flex-col items-center gap-20">
        <div className="bg-slate-600/20 rounded-xl md:p-10 py-10 md:w-7/12 w-full flex flex-col justify-center items-center gap-8 backdrop-blur-sm border border-gray-400/20 text-lg">
          <div className="flex flex-col gap-4 w-full md:px-20 px-5">
            <h1 className="text-4xl">{event.name}</h1>
            <div className="flex flex-col justify-around items-start gap-2">
              <span className="text-sm text-zinc-500">Descrição</span>
              <p className="text-base text-left">{event.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full md:px-20 px-5">
            <div className="flex flex-col justify-around items-start gap-2">
              <span className="text-sm text-zinc-500">Local:</span>
              <address className="text-left">{event.address}</address>
              <div className="flex flex-col justify-around items-start gap-2">
                <span className="text-sm text-zinc-500">Data de Início:</span>
                <span className="font-bold">{startDate} às {startTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}