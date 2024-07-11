import { api } from "@lib/axios";
import { CreateEventProps } from "src/types/event";

async function getEventByOrganizer(userId: string){
  return (await api.get(`/organized-events/${userId}`));
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

async function saveEvent(userId: string, eventData: CreateEventProps){
    return (await api.post(`/event`, {
    eventData,
    userId
  }));
}

const eventRepository = {
  getEventByOrganizer,
  getAllEventsByUserId,
  saveEvent,
  getOrganizedEvent,
  getEventsMetrics,
  getInvitedEvent
}

export default eventRepository