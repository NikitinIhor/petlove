export interface User {
  name: string | null;
  email: string | null;
  avatar: string | null;
  phone: string | null;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  name: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  name: string;
  token: string;
}

export type Notice = {
  _id: string;
  species: string;
  category: string;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  popularity: number;
};

export interface RefreshUserResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
  noticesFavorites: Notice[];
}

export interface Pet {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetFullUserInfoResponse {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  token: string;
  noticesViewed: Notice[];
  noticesFavorites: Notice[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface UserPet {
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
}
