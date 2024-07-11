const statusEnum: {[index: string]: string} = {
  SCHEDULED: "Agendado",
  ONGOING: "Em Andamento",
  COMPLETED: "Encerrado"
}

export function getEventStatus(status: string) {
  return statusEnum[status]
}