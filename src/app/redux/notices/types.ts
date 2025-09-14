export interface NoticesItem {
  _id: string;
  species: string;
  category: string;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt?: string;
}
export interface NoticesResponse {
  page: number;
  perPage: number;
  totalPages: number;
  results: NoticesItem[];
}
export interface FetchNoticesParams {
  keyword?: string;
  category?: string;
  species?: string;
  sex?: string;
  locationId?: string;
  byPrice?: boolean;
  byPopularity?: boolean;
  page?: number;
  limit?: number;
}
