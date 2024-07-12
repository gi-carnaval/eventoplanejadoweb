import { notifyError, notifyInfo } from "@lib/toastsNotifier"
import { getRefreshToken } from "@lib/tokenService"
import eventRepository from "@repositories/eventRepository"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axiosErrorHandler } from "../../../utils/axiosErrorHandler"
import { BackButton } from "@src/components/Atoms/BackButton"

export default function SingleInvitedEvent() {
  const { eventId } = useParams()
  const [event, setEvent] = useState()

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

  return (
    <>
      <BackButton />
      {
        event ? (
          <pre>{JSON.stringify(event, undefined, 2)}</pre>
        ) : (
          <h1>Evento não encontrado</h1>
        )
      }
    </>
  )
}