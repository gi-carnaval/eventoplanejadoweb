import { SingleOrganizedEventGuestListItem } from "@components/Atoms/SingleOrganizedEventGuestListItem";
import { SingleOrganizedEventInvitationListItem } from "@components/Atoms/SingleOrganizedEventInvitationListItem";
import { useAuth } from "@hooks/useAuth";
import { notifyError, notifySuccess } from "@lib/toastsNotifier";
import eventInvitationRepository from "@repositories/eventInvitationRepository";
import { axiosErrorHandler } from "@src/utils/axiosErrorHandler";
import { ISingleOrganizedEvent } from "src/types/event";

interface SingleOrganizedEventListProps {
  showGuestList: boolean;
  event: ISingleOrganizedEvent
  getUserRole: (role: string) => string;
}

export default function SingleOrganizedEventList({ showGuestList, event, getUserRole }: SingleOrganizedEventListProps) {

  const { user } = useAuth()

  async function approveInvite(invitationId: string) {
    try {
      if (user) {
        const response = await eventInvitationRepository.acceptInvite(event.id, invitationId, user.id)
        notifySuccess(response.data)
      }
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage)
    }
  }

  async function recuseInvite(invitationId: string) {
    try {
      if (user) {
        const response = await eventInvitationRepository.recuseInvite(event.id, invitationId, user.id)
        notifySuccess(response.data)
      }
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage)
    }
  }

  return (
    <>
      {showGuestList ? (
        event.EventUser.map((guest) => (
          <SingleOrganizedEventGuestListItem
            key={guest.user.name}
            user={guest.user}
            role={guest.role}
            getUserRole={getUserRole}
          />
        ))
      ) : (
        event.EventInvitation && event.EventInvitation?.length > 0 ? (
          event.EventInvitation.map((invitation) => (
            <SingleOrganizedEventInvitationListItem
              key={invitation.user.id}
              user={invitation.user}
              onApprove={() => { approveInvite(invitation.id) }}
              onReject={() => { recuseInvite(invitation.id) }}
            />
          ))
        ) : (
          <div className="bg-slate-600/20 rounded-xl px-10 py-4 w-full flex justify-between items-center gap-8 backdrop-blur-sm border  border-gray-400/20 text-lg">
            <h2 className="font-semibold">Nenhuma solicitação</h2>
          </div>
        )
      )}
    </>
  )
}