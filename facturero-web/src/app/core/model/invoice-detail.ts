import { Product } from "./product";

export class InvoiceDetail {
    company?: string;
    invoice?: string;
    product: Product;
    createdAt?: Date;
    price: number;
    quantity: number;
    totalWhitoutTax: number;
    total: number;
}