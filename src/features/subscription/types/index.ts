export type SubscriptionEntity = {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: Car[];
  startsAt: string;
  expiresAt: string;
  currentCheckins: CurrentCheckin[];
};

interface CurrentCheckin {
  ticketId: string;
  zoneId: string;
  checkinAt: string;
}

interface Car {
  plate: string;
  brand: string;
  model: string;
  color: string;
}

export type SubscriptionViewEntity = {
  id: string;
  userName: string;
  active: boolean;
  category: string;
  cars: Car[];
  startsAt: string;
  expiresAt: string;
  currentCheckins: CurrentCheckin[];
};

interface CurrentCheckin {
  ticketId: string;
  zoneId: string;
  checkinAt: string;
}

interface Car {
  plate: string;
  brand: string;
  model: string;
  color: string;
}


export interface TicketEntity {
  id: string;
  type: string;
  zoneId: string;
  gateId: string;
  checkinAt: string;
  checkoutAt: null;
}