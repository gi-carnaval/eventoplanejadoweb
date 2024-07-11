import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const eventStatusEnum: {[index: string]: string} = {
  SCHEDULED: "Agendado",
  ONGOING: "Em Andamento",
  CLOSED: "Encerrado"
}

export function getEventStatus(status: string) {
  return eventStatusEnum[status]
}

const roleEnum: {[index: string]: string} = {
  ORGANIZER: "Organizador",
  PARTICIPANT: "Convidado",
}

export function getUserRole(status: string) {
  return roleEnum[status]
}