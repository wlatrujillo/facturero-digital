
import { Branch } from "./branch";
import { Customer } from "./customer";
import { InvoiceDetail } from "./invoice-detail";
import { Payment } from "./payment";

export class Invoice {
  _id: string;
  company: string;
  branch: Branch | string;
  customer: Customer | string;
  secuence: number;
  createdAt: Date;
  totalWithoutTax: number;
  tax: number;
  ice: number;
  total: number;
  detail: InvoiceDetail[];
  payments: Payment[];
}