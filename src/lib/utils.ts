import { EventRequestProps } from "@src/pages/Dashboard/EventRequest/EventRequest"
import { IEvent } from "@src/types/event"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const eventStatusEnum: { [index: string]: string } = {
  SCHEDULED: "Agendado",
  ONGOING: "Em Andamento",
  CLOSED: "Encerrado"
}

export function getEventStatus(status: string) {
  return eventStatusEnum[status]
}

const roleEnum: { [index: string]: string } = {
  ORGANIZER: "Organizador",
  PARTICIPANT: "Convidado",
}

export function getEventUserStatus(status: string) {
  return eventUserStatusEnum[status]
}

const eventUserStatusEnum: { [index: string]: string } = {
  ACCEPTED: "Aceito",
  CHECKED_IN: "Presente",
  NO_SHOW: "Ausente",
  CANCELLED: "Cancelado"
}

export function getUserRole(status: string) {
  return roleEnum[status]
}

const inviteEventRequestStatusOrder = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3
};
const eventStatusOrder = {
  ONGOING: 1,
  SCHEDULED: 2,
  COMPLETED: 3
};

export const inviteEventRequestCompare = (a: EventRequestProps, b: EventRequestProps) => {
  if (inviteEventRequestStatusOrder[a.status] < inviteEventRequestStatusOrder[b.status]) {
    return -1;
  }
  if (inviteEventRequestStatusOrder[a.status] > inviteEventRequestStatusOrder[b.status]) {
    return 1;
  }

  const dateA = new Date(a.event.startDateTime);
  const dateB = new Date(b.event.startDateTime);
  return dateA.getTime() - dateB.getTime();
};

export const eventCompare = (a: IEvent, b: IEvent) => {
  if (eventStatusOrder[a.status] < eventStatusOrder[b.status]) {
    return -1;
  }
  if (eventStatusOrder[a.status] > eventStatusOrder[b.status]) {
    return 1;
  }

  const dateA = new Date(a.startDateTime);
  const dateB = new Date(b.startDateTime);
  return dateA.getTime() - dateB.getTime();
};