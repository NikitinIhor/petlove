export interface WorkDaysItem {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}

export interface WorkDaysItem {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}

export interface FriendsItem {
  _id: string;
  title: string;
  url: string;
  addressUrl: string | null;
  imageUrl: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  workDays: WorkDaysItem[] | null;
}

export type FriendsResponse = FriendsItem[];
