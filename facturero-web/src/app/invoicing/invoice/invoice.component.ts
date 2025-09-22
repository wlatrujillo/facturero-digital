import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SearchProductComponent } from '../searchproduct/search-product.component';
import { SearchCustomerComponent } from '../searchcustomer/search-customer.component';
import { Branch } from 'src/app/core/model';
import { Customer } from 'src/app/core/model/customer';
import { Invoice } from 'src/app/core/model/invoice';
import { InvoiceDetail } from 'src/app/core/model/invoice-detail';
import { User } from 'src/app/core/model/user';
import { WayPayment } from 'src/app/core/model/waypayment';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { BranchService } from 'src/app/core/service/branch.service';
import { CustomerService } from 'src/app/core/service/customer.service';
import { EstablishmentService } from 'src/app/core/service/establishment.service';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { ProductService } from 'src/app/core/service/product.service';
import { AlertService } from 'src/app/core/service/alert.service';
import { CustomerUpdateComponent } from '../customer/customer-update.component';
import { Payment } from 'src/app/core/model/payment';
import { Catalog } from 'src/app/core/model/catalog';
import { AdminService } from 'src/app/core/service/admin.service';
import { SearchBranchComponent } from '../search-branch/search-branch.component';
import { Observable } from 'rxjs';


declare const $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {


  @ViewChild('taxIdInput', { static: true }) taxIdInput;

  headerRow: string[];
  details: InvoiceDetail[];
  payments: Payment[] = [];
  customer: Customer;
  invoice: Invoice;
  branch: Branch;
  user: User;
  paymentMethod$: Observable<Catalog>;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private establishmentService: EstablishmentService,
    private branchService: BranchService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private adminService: AdminService) { }


  ngOnInit() {

    this.headerRow = ['CODIGO', 'PRODUCT', 'PRECIO', 'CANTIDAD', 'TOTAL'];

    this.user = this.authenticationService.currentUserValue;

    this.paymentMethod$ = this.adminService.getCatalogByName('payment_method');

    this.initBranch(this.user);

    this.initInvoice();

  }

  createInvoice(branch: Branch, customer: Customer, invoice: Invoice) {
    if (!customer._id) {
      this.alertService.error("Debes seleccionar el cliente");
      return;
    }
    if (this.details.length <= 0) {
      this.alertService.error("Debes ingresar al menos un producto a la factura");
      return;
    }
    invoice.customer = customer._id;
    invoice.detail = this.details;
    invoice.payments = this.payments;
    this.invoiceService.create(branch._id, invoice)
      .subscribe(newInvoice => {
        this.alertService.success('Factura creada exitosamente');
        this.initInvoice();
        console.log("Invoice created===>>", invoice)
      });
  }



  decreaseCount(detail: InvoiceDetail): void {
    if (detail.quantity > 1) detail.quantity--;
    detail.totalWhitoutTax = detail.quantity * detail.product.price;
    let iva = detail.product.taxes.find(e => e.tax == 'IVA');
    let ivaValue = iva ? iva.percentage / 100 : 0;
    detail.total = detail.totalWhitoutTax * (1 + ivaValue);
    this.setTotalInvoice();
  }

  increaseCount(detail: InvoiceDetail): void {
    detail.quantity++;
    detail.totalWhitoutTax = detail.quantity * detail.product.price;
    let iva = detail.product.taxes.find(e => e.tax == 'IVA');
    let ivaValue = iva ? iva.percentage / 100 : 0;
    detail.total = detail.totalWhitoutTax * (1 + ivaValue);
    this.setTotalInvoice();
  }

  removeItem(item) {
    let index = this.details.indexOf(item);
    this.details.splice(index, 1);
    this.setTotalInvoice();
  }

  searchCustomer() {
    this.customerService.findByTaxId(this.customer.taxId).subscribe(customer => this.customer = customer || {});
  }

  searchProduct() {
    this.productService.getById("");
  }


  addCustomer() {

    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      autoFocus: true,
      data: {},
      minWidth: "30%",
      panelClass: 'icon-outside'
    }

    const dialogRef = this.dialog.open(CustomerUpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      customer => {
        if (customer) this.customer = customer;
      }
    );

  }


  findCustomer() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};

    const dialogRef = this.dialog.open(SearchCustomerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      customer => {
        if (customer) this.customer = customer;
      }
    );

  }

  addProduct() {

    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      autoFocus: true,
      data: {}
    };
    const dialogRef = this.dialog.open(SearchProductComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      val => {
        if (val) {
          let iva = val.taxes.find(e => e.tax == 'IVA');
          let ivaValue = iva ? iva.percentage / 100 : 0;
          this.details.push({
            product: val,
            quantity: 1,
            price: val.price,
            totalWhitoutTax: val.price,
            total: val.price * (1 + ivaValue)
          });
          this.setTotalInvoice();
        }
      }
    );

  }

  addPayment() {
    let payment = new Payment();
    payment.code = '01';
    payment.value = this.calculatePayment();
    this.payments.push(payment);
  }

  removePayment(removeIndex, payment: Payment) {
    let value = payment.value || 0;
    this.payments = this.payments.filter((e, index) => index !== removeIndex);

    if (this.payments.length > 0)
      this.payments[this.payments.length - 1].value += value;

  }

  selectBranch() {
    const dialogConfig: MatDialogConfig = {
      disableClose: true,
      autoFocus: true,
      data: {}
    };

    const dialogRef = this.dialog.open(SearchBranchComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      branch => {
        if (branch) this.branch = branch;
      }
    );
  }

  private initBranch(user: User): void {
    this.establishmentService.get('', 'asc', 0, 10)
      .subscribe(establishments =>
        this.branchService.get(establishments[0]._id, '', 'asc', 0, 10)
          .subscribe(branchs => {
            this.branch = branchs[0]

          }));
  }

  private setTotalInvoice(): void {
    this.invoice.totalWithoutTax = this.details.reduce((a, d) => a + d.totalWhitoutTax, 0);
    this.invoice.total = this.details.reduce((a, d) => a + d.total, 0);
  };

  private calculatePayment(): number {
    let totalInvoice = this.invoice.total || 0;
    let totalPayments = this.payments.length == 0 ? 0 : this.payments.reduce((a, e) => a + e.value, 0);
    let dif = totalInvoice - totalPayments;
    return Math.round((dif + Number.EPSILON) * 100) / 100;
  }

  private initInvoice(): void {
    this.customer = new Customer();
    this.invoice = new Invoice();
    this.invoice.createdAt = new Date();
    this.details = [];
    this.payments = [];
  }

}
