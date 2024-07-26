import { useAuth } from "@hooks/useAuth"
import { notifyError, notifyInfo, notifySuccess } from "@lib/toastsNotifier"
import eventInvitationRepository from "@repositories/eventInvitationRepository"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axiosErrorHandler } from "../../../utils/axiosErrorHandler"
import eventRepository from "@src/repositories/eventRepository"
import { Skeleton } from "@mui/material"
import dayjs from "dayjs"
import { BackButton } from "@src/components/Atoms/BackButton"
import { Helmet } from "react-helmet-async"

interface EventUserJoinEventProps {
  user: {
    name: string,
    picture: string
  }
}

interface JoinEventProps {
  name: string,
  description: string,
  startDateTime: Date,
  address: string,
  EventUser: EventUserJoinEventProps[]
}

export default function JoinEvent() {
  const [event, setEvent] = useState<JoinEventProps>()
  const { eventId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [hasSentInvitation, setHasSentInvitation] = useState<boolean>(false);

  const postInvitation = async (eventId: string, userId: string) => {
    try {
      const response = await eventInvitationRepository.createInviteToEvent(eventId, userId)
      notifySuccess(response.data, 2000)
      setTimeout(() => {
        notifyInfo("Você poderá acompanhar suas solicitações através do menu 'Minhas Solicitações'")
      }, 2000)
      navigate("/app")
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage)
    }
  }

  const handlePostInvitation = () => {
    if (eventId && user && !hasSentInvitation) {
      postInvitation(eventId, user.id)
      setHasSentInvitation(true);
    }
  }

  const getEventDatas = async (eventId: string) => {
    try {
      const response = await eventRepository.getInvitedEventRequest(eventId)
      setEvent(response.data)
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage)
    }
  }

  useEffect(() => {
    if (eventId) {
      getEventDatas(eventId)
    }

  }, [eventId, user])

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
      <Helmet>
        <title>{`Entrar no evento ${event.name}`}</title>
        <meta property="og:title" content={`Entrar no evento ${event.name}`} />
        <meta property="og:title" content="Link preview title"/>
        <meta property="description" content={`Participe do evento ${event.name} e tenha acesso a todas as informações. Solicite sua entrada e fique por dentro dos detalhes do evento.`} />
        <meta property="description" content="Search engine description" />
        <meta property="og:description" content={`Participe do evento ${event.name} e tenha acesso a todas as informações. Solicite sua entrada e fique por dentro dos detalhes do evento.`} />
      </Helmet>
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
          <button className="bg-yellow-500 text-zinc-950 disabled:brightness-50 disabled:cursor-not-allowed" disabled={hasSentInvitation} onClick={handlePostInvitation}>Entrar no evento</button>
        </div>
      </div>
    </>
  )
}