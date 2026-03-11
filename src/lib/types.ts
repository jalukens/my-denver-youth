export interface Child {
  id: string;
  name: string;
  age: number;
  birthDate: string;
  avatar: string;
  eligiblePrograms: string[];
}

export interface Family {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  children: Child[];
  denverCardNumber: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  coordinates: { lat: number; lng: number };
}

export interface FundingAccount {
  id: string;
  name: string;
  nameEs: string;
  type: 'scholarship' | 'grant' | 'subsidy';
  balance: number;
  maxBalance: number;
  color: string;
  description: string;
  descriptionEs: string;
  eligibleCategories: string[];
  expirationDate?: string;
}

export interface Program {
  id: string;
  name: string;
  nameEs: string;
  provider: string;
  providerEs?: string;
  category: Category;
  description: string;
  descriptionEs: string;
  ageRange: { min: number; max: number };
  schedule: Schedule;
  location: Location;
  cost: number;
  spotsTotal: number;
  spotsAvailable: number;
  acceptedFunding: string[];
  image: string;
  tags: string[];
}

export interface Schedule {
  days: Day[];
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  sessionLength: string;
}

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Location {
  name: string;
  address: string;
  neighborhood: string;
  coordinates: { lat: number; lng: number };
}

export type Category = 'sports' | 'stem' | 'arts' | 'outdoor' | 'academic' | 'music' | 'dance' | 'life-skills';

export interface Registration {
  id: string;
  programId: string;
  childId: string;
  status: 'confirmed' | 'waitlisted' | 'pending';
  registrationDate: string;
  fundingApplied: FundingApplied[];
  totalCost: number;
  familyCost: number;
}

export interface FundingApplied {
  fundingId: string;
  amount: number;
}

export interface Activity {
  id: string;
  programId: string;
  childId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Transaction {
  id: string;
  date: string;
  programName: string;
  childName: string;
  fundingAccountId: string;
  amount: number;
  type: 'debit' | 'credit';
}

export interface CheckInLocation {
  id: string;
  name: string;
  nameEs: string;
  type: 'library' | 'rec-center';
  address: string;
  neighborhood: string;
  coordinates: { lat: number; lng: number };
  hours: string;
  hoursEs: string;
  distance: number;
  programs: string[];
}

export interface CheckInRecord {
  id: string;
  locationId: string;
  childId: string;
  timestamp: string;
  type: 'program-session' | 'open-use';
}

export interface SchoolProgram {
  id: string;
  name: string;
  nameEs: string;
  school: string;
  schoolEs: string;
  childId: string;
  category: Category;
  schedule: { days: Day[]; startTime: string; endTime: string };
  instructor: string;
  room: string;
  spotsAvailable: number;
  spotsTotal: number;
  cost: number;
  acceptedFunding: string[];
  description: string;
  descriptionEs: string;
}

export interface ExperienceVenue {
  id: string;
  name: string;
  nameEs: string;
  emoji: string;
  address: string;
  neighborhood: string;
  discountType: 'free' | 'discounted';
  discountLabel: string;
  discountLabelEs: string;
  description: string;
  descriptionEs: string;
}
