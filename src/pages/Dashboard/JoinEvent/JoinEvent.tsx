import { useAuth } from "@hooks/useAuth"
import { notifyError, notifySuccess } from "@lib/toastsNotifier"
import eventInvitationRepository from "@repositories/eventInvitationRepository"
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { axiosErrorHandler } from "../../../utils/axiosErrorHandler"

export default function JoinEvent() {
  const { eventId } = useParams()
  const { user } = useAuth()

  const hasSentInvitation = useRef(false);

  useEffect(() => {
    const postInvitation = async (eventId: string, userId: string) => {
      try {
        const response = await eventInvitationRepository.createInviteToEvent(eventId, userId)
        notifySuccess(response.data)
      } catch (error) {
        const errorMessage = axiosErrorHandler(error)
        notifyError(errorMessage)
      }
    }

    if (eventId && user && !hasSentInvitation.current) {
      postInvitation(eventId, user.id)
      hasSentInvitation.current = true;
    }
  }, [eventId, user])

  return (
    <>
      <h1>Entrar no evento</h1>
    </>
  )
}