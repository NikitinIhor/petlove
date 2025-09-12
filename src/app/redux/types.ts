export interface News {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
}

export interface NewsItem {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
}

export interface NewsResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: NewsItem[];
}
// -----------------------------------------------------------News
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
// -----------------------------------------------------------Friends
