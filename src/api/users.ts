import { sleep } from 'react-query/types/core/utils';
import type { PaginatedResponse } from './posts';

const API_URL = 'https://dummyjson.com/users';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
};

export type GetUsersResponse = PaginatedResponse & {
  users: User[];
};
export async function getUsers({
  page = 1,
  limit = 10,
  getAll = false,
}): Promise<GetUsersResponse> {
  const queryParams = getAll
    ? '?limit=150'
    : `?limit=${limit}&skip=${(page - 1) * limit}`;
  const query = `${API_URL}${queryParams}`;
  try {
    const response = await fetch(query);
    return (await response.json()) as GetUsersResponse;
  } catch (error) {
    throw new Error('Error while fetching data');
  }
}

export async function getUser(id: string) {
  const query = `${API_URL}/${id}`;
  try {
    await sleep(1000);
    const data = await fetch(query);
    return (await data.json()) as User;
  } catch (error) {
    throw new Error('Error while fetching data');
  }
}
