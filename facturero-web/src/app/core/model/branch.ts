import { Establishment } from './establishment'
export class Branch {
  _id: string;
  establishment: Establishment;
  name: string;
  code: string;
  address: string;
  next: number;
}