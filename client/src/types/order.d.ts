import { User } from './user'
export interface Order {
  id: number;
  user: User;
  service: string;
  time: string;
  address: string;
  satus: string;
  price: number;
}