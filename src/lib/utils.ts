import { EventRequestProps } from "@src/pages/Dashboard/EventRequest/EventRequest"
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

export function getUserRole(status: string) {
  return roleEnum[status]
}

const statusOrder = {
  PENDING: 1,
  APPROVED: 2,
  REJECTED: 3
};

// Função de comparação personalizada
export const compare = (a: EventRequestProps, b:EventRequestProps) => {
  // Compare os status primeiro
  if (statusOrder[a.status] < statusOrder[b.status]) {
    return -1;
  }
  if (statusOrder[a.status] > statusOrder[b.status]) {
    return 1;
  }

  // Se os status são iguais, compare as datas
  const dateA = new Date(a.event.startDateTime);
  const dateB = new Date(b.event.startDateTime);
  return dateA - dateB;
};