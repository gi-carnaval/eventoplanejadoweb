import { api } from "@lib/axios";

async function createInviteToEvent(eventId: string, userId: string){
  return (await api.post(`/event/${eventId}/request-entry`, {
    guestId: userId
  }));
}

async function acceptInvite(eventId: string, invitaionId: string, userId: string){
  return (await api.put(`/event/${eventId}/invitations/${invitaionId}/accept`, {
    organizerId: userId
  }));
}

async function recuseInvite(eventId: string, invitaionId: string, userId: string){
  return (await api.put(`/event/${eventId}/invitations/${invitaionId}/recuse`, {
    organizerId: userId
  }));
}

async function getInvitesrequest(userId: string) {
  return (await api.get(`/eventInvitations/invitations/${userId}`))
}

async function getNotifications(userId: string){
  return (await api.get(`/eventInvitations/${userId}/count`));
}

async function getInvites(userId: string){
  return (await api.get(`/eventInvitations/${userId}`));
}

const eventInvitationRepository = {
  createInviteToEvent,
  acceptInvite,
  recuseInvite,
  getNotifications,
  getInvites,
  getInvitesrequest
}

export default eventInvitationRepository