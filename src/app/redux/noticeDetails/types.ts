export interface NoticeLocation {
  _id: string;
  stateEn: string;
  cityEn: string;
}

export interface NoticeUser {
  _id: string;
  email: string;
  phone: string;
}

export interface NoticeDetailsResponse {
  _id: string;
  species: string;
  category: string;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: NoticeLocation;
  imgURL: string;
  createdAt: string;
  user: NoticeUser;
  popularity: number;
  updatedAt: string;
}
