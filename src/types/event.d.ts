interface User {
  name: string;
  email: string;
  picture: string;
  _count?: {
    EventInvitation?: number;
    EventUser?: number;
  };
}

interface ISingleOrganizedEventUser {
  id?: string;
  name: string;
  email?: string;
  picture: string;
}

interface EventUser {
  role: string;
  user: User;
}

interface EventInvitation {
  id: string
  user: ISingleOrganizedEventUser;
}

interface ISingleOrganizedEventCount {
  EventUser: number;
  EventInvitation: number;
}

export interface ISingleOrganizedEvent {
  id: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  address: string;
  createdAt: string;
  _count: ISingleOrganizedEventCount;
  EventUser: EventUser[];
  EventInvitation?: EventInvitation[];
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED';
}

export interface IEvent {
  id: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  address: string;
  createdAt: string;
  EventUser: EventUser[];
  _count?: EventCount;
  EventInvitation?: EventInvitation[];
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED';
}

export interface CreateEventProps {
  name: string
  description: string
  address: string,
  startDateTime: string
  endDateTime: string
  cartName: string
}

export interface EventMetricsProps {
  createdEvents: number
	invitedPeople: number
	invitedEvents: number
}
