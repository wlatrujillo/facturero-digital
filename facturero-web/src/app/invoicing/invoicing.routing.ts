import { Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';


export const InvoicingRoutes: Routes = [
  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'debit-note',
    component: InvoiceComponent
  },
  {
    path: 'credit-note',
    component: InvoiceComponent
  },
  {
    path: 'remittance-guide',
    component: InvoiceComponent
  }
];
