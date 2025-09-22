import { TaxValue } from "./tax-value";

export class Product {
  _id: string;
  category: string;
  name: string;
  code: string;
  auxCode: string;
  description: string;
  createdAt: string;
  active: boolean;
  type: string;
  price: number;
  taxes: TaxValue[];
}