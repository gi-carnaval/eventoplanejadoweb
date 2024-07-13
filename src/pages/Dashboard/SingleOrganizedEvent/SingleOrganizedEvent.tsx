import { notifyError, notifyInfo, notifySuccess } from "@lib/toastsNotifier"
import { getRefreshToken } from "@lib/tokenService"
import eventRepository from "@repositories/eventRepository"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axiosErrorHandler } from "../../../utils/axiosErrorHandler"
import { ISingleOrganizedEvent } from "src/types/event"
import dayjs from "dayjs"
import { getUserRole } from "@lib/utils"
import { MdContentCopy } from "react-icons/md"
import { SingleOrganizedEventToggleListButton } from "@components/Molecules/SingleOrganizedEventToggleListButton"
import SingleOrganizedEventList from "@components/Molecules/SingleOrganizedEventList/SingleOrganizedEventList"
import { getEventStatus } from "@lib/getEventStatus"
import { BackButton } from "@src/components/Atoms/BackButton"
import { Skeleton } from "@mui/material"

export default function SingleOrganizedEvent() {
  const { eventId } = useParams()
  const [, setSocket] = useState<WebSocket | null>(null);
  const [event, setEvent] = useState<ISingleOrganizedEvent>()
  const [showGuestList, setShowGuestList] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/ws/events');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'refreshSingleEvent', eventId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'refreshInvitationStatus' && data.eventId === eventId) {
        const refresh_token = getRefreshToken()
        if (refresh_token && eventId) {
          const { userId } = refresh_token
          getEvent(userId, eventId);
        }
      }
    };

    setSocket(ws);

    // return () => {
    //   ws.close();
    // };
  }, [eventId]);

  const getEvent = async (userId: string, eventId: string) => {
    try {
      const result = await eventRepository.getOrganizedEvent(userId, eventId)
      setEvent(result.data)
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage, 2500)
      notifyInfo("Redirecionando para a home", 2500)
      setTimeout(() => {
        navigate("/app")
      }, 2500)
    }
  }

  useEffect(() => {
    const refresh_token = getRefreshToken()
    if (refresh_token && eventId) {
      const { userId } = refresh_token
      getEvent(userId, eventId)
    }
  }, [eventId]);

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

  function copyText() {
    { navigator.clipboard.writeText(inviteLink) }
    notifySuccess("Texto copiado com sucesso")
  }

  const inviteLink = `${import.meta.env.VITE_THIS_BASE_URL}/join/${event.id}`

  const startDate = dayjs(event.startDateTime).format("DD/MM/YYYY")
  const startTime = dayjs(event.startDateTime).format("HH:mm")
  const endDate = dayjs(event.endDateTime).format("DD/MM/YYYY")
  const endTime = dayjs(event.endDateTime).format("HH:mm")
  return (
    <>
      <BackButton />
      <div className="w-full flex flex-col items-center gap-20">
        <div className="bg-slate-600/20 rounded-xl md:p-10 py-10 md:w-7/12 w-full flex flex-col justify-center items-center gap-8 backdrop-blur-sm border border-gray-400/20 text-lg">
          <div className="flex flex-col gap-4 w-full md:px-20 px-5">
            <span className={`${getEventStatus(event.status) == "Encerrado" ? 'text-red-800' : getEventStatus(event.status) == "Agendado" ? 'text-green-800' : 'text-blue-800'}`}>Evento {getEventStatus(event.status)}</span>
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
            </div>
            <div className="flex flex-col justify-around items-start gap-2">
              <span className="text-sm text-zinc-500">Data de Início:</span>
              <span className="font-bold">{startDate} às {startTime}</span>
            </div>
            <div className="flex flex-col justify-around items-start gap-2">
              <span className="text-sm text-zinc-500">Data de Encerramento: </span>
              <span className="font-bold">{endDate} às {endTime}</span>
            </div>
            <div className="flex flex-col justify-around items-start gap-2">
              <span className="text-sm text-zinc-500">Quantidade de participantes: </span>
              <span className="font-bold">{event._count?.EventUser}</span>
            </div>
            {
              event.status !== "COMPLETED" ? (
                <div className="flex flex-col justify-start items-start gap-2">
                  <span className="text-sm text-zinc-500">Link do convite:</span>
                  <span
                    onClick={() => copyText()}
                    className="text-sm underline cursor-pointer text-yellow-500 flex justify-center items-center gap-2 hover:text-yellow-600"
                    title="Clique para copiar o link">
                    {inviteLink}
                    <MdContentCopy className="md:text-2xl text-4xl" />
                  </span>
                </div>
              ) : null
            }

          </div>
        </div>
        <div className="md:w-7/12 w-full flex flex-col gap-4">
          <div className="w-full flex justify-between items-center gap-2">
            <SingleOrganizedEventToggleListButton
              active={showGuestList}
              onClick={() => setShowGuestList(true)}
              label="Lista de Convidados"
            />
            <SingleOrganizedEventToggleListButton
              active={!showGuestList}
              onClick={() => setShowGuestList(false)}
              label="Solicitações de Entrada"
              withBadge={true}
              badgeCount={event._count.EventInvitation}
            />
          </div>
          <SingleOrganizedEventList showGuestList={showGuestList} event={event} getUserRole={getUserRole} />
        </div>
      </div>
    </>
  )
}