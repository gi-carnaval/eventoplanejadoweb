import { api } from "@lib/axios";
import { CreateEventProps } from "src/types/event";

async function getEventByOrganizer(userId: string){
  return (await api.get(`/events/${userId}`));
}

async function getAllEventsByUserId(userId: string){
  return (await api.get(`/events/${userId}`));
}
async function getEventsMetrics(userId: string){
  return (await api.get(`/events/metrics/${userId}`));
}

async function getOrganizedEvent(userId: string, eventId: string){
  return (await api.get(`/organized-event/${userId}/${eventId}`));
}
async function getInvitedEvent(userId: string, eventId: string){
  return (await api.get(`/invited-event/${userId}/${eventId}`));
}

async function getInvitedEventRequest(eventId: string) {
  return( await api.get(`/invited-event-request/${eventId}`))
}

async function saveEvent(userId: string, eventData: CreateEventProps){
    return (await api.post(`/event`, {
    eventData,
    userId
  }));
}

async function validateGuestInvite(eventId: string, eventUserId: string, organizerId: string){
  return (await api.put(`/event/${eventId}`, {
  eventUserId,
  organizerId
}));
}

const eventRepository = {
  getEventByOrganizer,
  getAllEventsByUserId,
  saveEvent,
  getOrganizedEvent,
  getEventsMetrics,
  getInvitedEvent,
  getInvitedEventRequest,
  validateGuestInvite
}

export default eventRepository